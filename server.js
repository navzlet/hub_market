const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const passport = require('passport')
const port = process.env.PORT || 3306
const db = require('./settings/db')

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())
app.use(passport.initialize())
require('./middleware/passport')(passport)

setInterval(()=>{
    db.query('UPDATE month_wallet SET balance = 30')
}, 15000)

const routes = require('./settings/routes')
routes(app)

app.listen(port, () => {
    console.log('App Listening')
}
);
