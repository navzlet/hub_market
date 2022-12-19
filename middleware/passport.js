const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('./../config/keys')
const db = require('../settings/db')


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt 
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done)=>{
      try {
        db.query("SELECT `user_id`, `login` FROM `user` WHERE `user_id` = '" + payload.userId + "'", (error, rows, fields) => {
            if(error) {
                console.log(error)
            } else {
                const user = rows[0]
                console.log(user)
                if(user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            }
        })
    } catch(e) {
        console.log(e);
    }
    })
  )
}
