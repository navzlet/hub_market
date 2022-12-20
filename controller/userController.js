const response = require('./../response.js')
const db = require('./../settings/db')

exports.getUser = (req, res) => {
        db.query("SELECT * FROM user WHERE `login` = '" + req.user.login + "'", (error, rows, fields) => {
        if(error) {
        response.status(400, error, res)
                } else {
        response.status(200, rows[0], res)
        console.log(res)
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
        const sql = "SELECT `name`, `login` FROM user WHERE (`login` LIKE  '%" + req.body.search + "%' and `login` NOT LIKE '" + req.user.login +"') or `name` LIKE  '%" + req.body.search + "%'"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
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

        if(sender_id !== getter_id){
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
                        response.status(200, rows, res)
                }})
        }
})
        }
})
}
else{
        res.status(400).json({error: "Can't send money to youself!!!"})
}
}

exports.getTransaction = (req, res) => {
        transaction_id = req.params.id
        const sql = "SELECT `getter_id`, `sender_id`, `amount`, `comment`, `date`, `comment_is_hidden` FROM transaction WHERE `id` LIKE  '" + transaction_id + "'"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows[0], res)
        }})
}

exports.getAllTransactions = (req, res) => {
        const sql = "SELECT * FROM transaction"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}

exports.getIncomingTransactions = (req, res) => {
        const sql = "SELECT * FROM transaction WHERE getter_id = '"+ req.user.login + "'"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}

exports.getOutcomingTransactions = (req, res) => {
        const sql = "SELECT * FROM transaction WHERE sender_id = '"+ req.user.login + "'"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}

exports.rating_senders_all = (req, res) => {
        //1. посчитать количество монет для каждого login
        //2. вернуть order by количество
        const sql = "SELECT `sender_id`, `date`,`id`, SUM(amount) as `total_amount` FROM transaction GROUP BY `sender_id` ORDER BY `total_amount` DESC"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}

exports.rating_getters_all = (req, res) => {
        //1. посчитать количество монет для каждого login
        //2. вернуть order by количество
        const sql = "SELECT `getter_id`, `date`,`id`, SUM(amount) as `total_amount` FROM transaction GROUP BY `getter_id` ORDER BY `total_amount` DESC"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}


exports.rating_getters_month = (req, res) => {
        const date = new Date()
        const sql = "SELECT `getter_id`, `date`,`id`, SUM(amount) as `total_amount` FROM transaction WHERE `date` LIKE '" + date.getFullYear() + "-" + (date.getMonth() + 1)  + "%' GROUP BY `getter_id` ORDER BY `total_amount` DESC"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}

exports.rating_senders_month = (req, res) => {
        const date = new Date()
        const sql = "SELECT `sender_id`, `date`,`id`, SUM(amount) as `total_amount` FROM transaction WHERE `date` LIKE '" + date.getFullYear() + "-" + (date.getMonth() + 1)  + "%' GROUP BY `sender_id` ORDER BY `total_amount` DESC"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                console.log(sql)
                response.status(200, rows, res)
        }})
}
