const response = require('./../response.js')
const db = require('./../settings/db')

exports.getUser = (req, res) => {
        db.query("SELECT * FROM user WHERE `login` = '" + req.user.login + "'", (error, rows, fields) => {
        if(error) {
        response.status(400, error, res)
                } else {
        response.status(200, rows[0], res)
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
        const sql = "SELECT `login`, `balance` FROM shared_wallet WHERE `login` = '" + req.user.login + "'"
        db.query("SELECT `login`, `balance` FROM shared_wallet WHERE `login` = '" + req.user.login + "'", (error, rows, fields) => {
        if(error) {
        response.status(400, error, res)
} else {
        response.status(200, rows[0], res)
}})     
}

exports.getUserNames = (req, res) => {
        const sql = "SELECT `name`, `login` FROM user WHERE (`login` LIKE  '%" + req.body.search + "%' and `login` NOT LIKE '" + req.user.login + "') or (`name` LIKE  '%" + req.body.search + "%' and `login` NOT LIKE '" + req.user.login + "')"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}

exports.share = (req, res) => {
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(date);
        const sender_id = req.user.login
        const getter_id = req.body.getter_id
        const amount = req.body.amount
        const comment = req.body.comment
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
        const sql = "SELECT * FROM transaction JOIN (SELECT name as sender_name, login from user) as user_s on transaction.sender_id = user_s.login JOIN (SELECT name as getter_name, login from user) as user_g on transaction.getter_id = user_g.login ORDER BY id DESC LIMIT 20"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}

exports.getIncomingTransactions = (req, res) => {
        const sql = "SELECT * FROM transaction JOIN (SELECT name as sender_name, login from user) as user_s on transaction.sender_id = user_s.login JOIN (SELECT name as getter_name, login from user) as user_g on transaction.getter_id = user_g.login WHERE getter_id = '"+ req.user.login + "' ORDER BY id DESC LIMIT 20"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}

exports.getOutcomingTransactions = (req, res) => {
        const sql = "SELECT * FROM transaction JOIN (SELECT name as sender_name, login from user) as user_s on transaction.sender_id = user_s.login JOIN (SELECT name as getter_name, login from user) as user_g on transaction.getter_id = user_g.login WHERE sender_id = '"+ req.user.login + "' ORDER BY id DESC LIMIT 20"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}

exports.rating_senders_all = (req, res) => {        
        //SELECT * FROM user JOIN (SELECT sender_id, date, SUM(amount) as `total_amount` FROM transaction GROUP BY transaction.sender_id) as transaction on user.login = transaction.sender_id ORDER by `total_amount` DESC
        const sql = "SELECT * FROM user JOIN (SELECT sender_id, date, SUM(amount) as `total_amount` FROM transaction GROUP BY transaction.sender_id) as transaction on user.login = transaction.sender_id ORDER by `total_amount` DESC"
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
        const sql = "SELECT * FROM user JOIN (SELECT getter_id, date, SUM(amount) as `total_amount` FROM transaction GROUP BY transaction.getter_id) as transaction on user.login = transaction.getter_id ORDER by `total_amount` DESC"
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}


exports.rating_getters_month = (req, res) => {
        const date = new Date()
        const sql = "SELECT * FROM user JOIN (SELECT getter_id, date, SUM(amount) as `total_amount` FROM transaction WHERE `date` LIKE '" + date.getFullYear() + "-0" + (date.getMonth() + 1)  + "%' GROUP BY transaction.getter_id) as transaction on user.login = transaction.getter_id ORDER by `total_amount` DESC"
        const sql2 = "SELECT * FROM user JOIN (SELECT getter_id, date, SUM(amount) as `total_amount` FROM transaction WHERE `date` LIKE '" + date.getFullYear() + "-" + (date.getMonth() + 1)  + "%' GROUP BY transaction.getter_id) as transaction on user.login = transaction.getter_id ORDER by `total_amount` DESC"
        date.getMonth() + 1 < 10 ?
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }}) 
        :
        db.query(sql2, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})
}

exports.rating_senders_month = (req, res) => {
        const date = new Date()
        const sql = "SELECT * FROM user JOIN (SELECT sender_id, date, SUM(amount) as `total_amount` FROM transaction WHERE `date` LIKE '" + date.getFullYear() + "-0" + (date.getMonth() + 1)  + "%' GROUP BY transaction.sender_id) as transaction on user.login = transaction.sender_id ORDER by `total_amount` DESC"
        const sql2 = "SELECT * FROM user JOIN (SELECT sender_id, date, SUM(amount) as `total_amount` FROM transaction WHERE `date` LIKE '" + date.getFullYear() + "-" + (date.getMonth() + 1)  + "%' GROUP BY transaction.sender_id) as transaction on user.login = transaction.sender_id ORDER by `total_amount` DESC"
        date.getMonth() + 1 < 10 ?
        db.query(sql, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }}) : 
        db.query(sql2, (error, rows, fields) => {
                if(error) {
                response.status(400, error, res)
        } else {
                response.status(200, rows, res)
        }})

}
