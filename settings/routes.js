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

        app
        .route('/getSharedBalance')
        .get(passport.authenticate('jwt', { session: false }), userController.getSharedBalance)

    app
        .route('/getUserNames')
        .get(passport.authenticate('jwt', { session: false }), userController.getUserNames)

    app
        .route('/share')
        .post(passport.authenticate('jwt', { session: false }), userController.share)
}