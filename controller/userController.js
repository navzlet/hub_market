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

exports.getSharedBalance = (req, res) => {
        db.query("SELECT `login`, `balance` FROM shared_wallet WHERE `login` = '" + req.user.login + "'", (error, rows, fields) => {
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

exports.share = (req, res) => {

        const sender_id = req.user.login
        const getter_id = req.body.getter_id
        const amount = req.body.amount
        const comment = req.body.comment
        const date = req.body.date
        const comment_is_hidden = req.body.comment_is_hidden


        const remove_sender_sql = "UPDATE month_wallet SET balance = balance - '" + amount + "' WHERE login = '" + req.user.login + "'"
        db.query(remove_sender_sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        }
else{
        
        const add_getter_sql = "UPDATE shared_wallet SET balance = balance + '" + amount + "' WHERE login = '" + req.body.getter_id + "'"
        db.query(add_getter_sql, (error, rows, fields) => {
                if(error) {
                        response.status(400, error, res)
        }
        else{
                const sql = "INSERT INTO `transaction` (`getter_id`, `sender_id`, `amount`, `comment`, `date`, `comment_is_hidden`) VALUES ('" + getter_id + "', '" + sender_id + "', '" + amount + "', '" + comment + "', '" + date + "', '" + comment_is_hidden + "'); "
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                console.log(sql)
                response.status(200, rows, res)
        }})
        }
})
}
})



}