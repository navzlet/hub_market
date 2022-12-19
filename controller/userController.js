const response = require('./../response.js')

const db = require('./../settings/db')

exports.getAll = (req, res) => {
    db.query('SELECT * FROM user', (error, rows, fields) => {
if(error) {
        response.status(400, error, res)
} else {
        response.status(200, rows, res)
}})
}

exports.getMonthBalance = (req, res) => {
        db.query("SELECT `login`, `balance` FROM month_wallet WHERE `login` = '" + req.user.login + "'", (error, rows, fields) => {
        if(error) {
        response.status(400, error, res)
} else {
        response.status(200, rows[0], res)
}})
}

exports.getUserNames = (req, res) => {
        const sql = "SELECT `name`, `login` FROM user WHERE `login` LIKE  '%" + req.body.search + "%' or `name` LIKE  '%" + req.body.search + "%'"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                console.log(sql)
                response.status(200, rows, res)
        }})
}