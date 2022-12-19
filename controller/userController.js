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