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
        db.query("SELECT `user_id`, `balance` FROM month_wallet WHERE `user_id` = '" + req.user.user_id + "'", (error, rows, fields) => {
        if(error) {
        response.status(400, error, res)
} else {
        response.status(200, rows[0], res)
}})
}