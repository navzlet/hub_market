module.exports = (app) => {
    const auth = require('./../controller/auth.js')
    const passport = require('passport')
    const userController = require('./../controller/userController')

    app
        .route('/register')
        .post(auth.register);

    app
        .route('/login')
        .post(auth.login)

    app
        .route('/getAll')
        .get(passport.authenticate('jwt', { session: false }), userController.getAll)

    app
        .route('/getMonthBalance')
        .get(passport.authenticate('jwt', { session: false }), userController.getMonthBalance)
}