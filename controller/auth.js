const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const response = require('./../response.js')
const db = require('./../settings/db')
const keys = require('./../config/keys')

exports.register = async function(req, res){
    db.query("SELECT `user_id`, `login`, `name` FROM `user` WHERE `login` = '" + req.body.login + "'", (error, rows, fields) => {
        if(error) {
            response.status(400, error, res)
        } else if(typeof rows !== 'undefined' && rows.length > 0) {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                response.status(302, {message: `Пользователь с таким login - ${rw.login} уже зарегстрирован!`}, res)
                return true
            })
        } else {
            const login = req.body.login
            const name = req.body.name
            const salt = bcrypt.genSaltSync(10)
            const password = bcrypt.hashSync(req.body.password, salt) 

            const sql = "INSERT INTO `user`(`login`, `name`, `password`) VALUES('" + login + "', '" + name + "', '" + password + "');";
            const sql2 = " INSERT INTO `month_wallet`(`login`, `balance`) VALUES('" + login + "', '30')"
            db.query(sql, (error, results) => {
                if(error) {
                    response.status(400, error, res)
                } else {
                    response.status(200, {message: `Регистрация прошла успешно.`, results}, res)
                }
            })
            db.query(sql2, (error, results) => {
                console.log('добавлен месячный кошелёк')
            })
        }
    })
}

exports.login = (req, res) => {
  db.query("SELECT `user_id`, `login`, `password` FROM `user` WHERE `login` = '" + req.body.login + "'", (error, rows, fields) => {
      if(error) {
          response.status(400, error, res)
      } else if(rows.length <= 0) {
          response.status(401, {message: `Пользователь с login - ${req.body.login} не найден. Пройдите регистрацию.`}, res)
      } else {
          const row = JSON.parse(JSON.stringify(rows))
          row.map( rw => {
              const password = bcrypt.compareSync(req.body.password, rw.password)
              if(password) {
                  //Если true мы пускаем юзера и генерируем токен
                  const token = jwt.sign({ 
                      userId: rw.user_id,
                      login: rw.login
                  }, keys.jwt, { expiresIn: 120 * 120 })
                  response.status(200, {token: `Bearer ${token}`, id: rw.login}, res)
              } else {
                  //Выкидываем ошибку что пароль не верный
                  response.status(401, {message: `Пароль не верный.`}, res)
              }
              return true
          })
      }
  })
}