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
        .route('/getUser')
        .get(passport.authenticate('jwt', { session: false }), userController.getUser)

        app
        .route('/getMonthBalance')
        .get(passport.authenticate('jwt', { session: false }), userController.getMonthBalance)

        app
        .route('/getSharedBalance')
        .get(passport.authenticate('jwt', { session: false }), userController.getMonthBalance)

    app
        .route('/getUserNames')
        .get(passport.authenticate('jwt', { session: false }), userController.getUserNames)

    app
        .route('/share')
        .post(passport.authenticate('jwt', { session: false }), userController.share)

        app
        .route('/transaction/:id')
        .get(passport.authenticate('jwt', { session: false }), userController.getTransaction)

        app
        .route('/getAllTransactions')
        .get(passport.authenticate('jwt', { session: false }), userController.getAllTransactions)

        app
        .route('/getIncomingTransactions')
        .get(passport.authenticate('jwt', { session: false }), userController.getIncomingTransactions)

        app
        .route('/getOutcomingTransactions')
        .get(passport.authenticate('jwt', { session: false }), userController.getOutcomingTransactions)

        app
        .route('/getOutcomingTransactions')
        .get(passport.authenticate('jwt', { session: false }), userController.getOutcomingTransactions)

        app
        .route('/getOutcomingTransactions')
        .get(passport.authenticate('jwt', { session: false }), userController.getOutcomingTransactions)

        app
        .route('/rating_senders/all_time')
        .get(passport.authenticate('jwt', { session: false }), userController.rating_senders_all)

        app
        .route('/rating_getters/all_time')
        .get(passport.authenticate('jwt', { session: false }), userController.rating_getters_all)
    
        app
        .route('/rating_senders/month')
        .get(passport.authenticate('jwt', { session: false }), userController.rating_senders_month)

        app
        .route('/rating_getters/month')
        .get(passport.authenticate('jwt', { session: false }), userController.rating_getters_month)
    }