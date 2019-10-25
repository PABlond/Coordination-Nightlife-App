import passportJWT from "passport-jwt"
import User from "./../models/user"
import Auth from "./../controllers/auth"
require("dotenv").config()

const { Strategy: JwtStrategy, ExtractJwt } = passportJWT

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

console.log(new Auth().getToken("pierre-alexis.blond@live.fr"))

export default (passport: any) =>
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const { email } = jwt_payload
      try {
        const user = await User.findOne({ email })
        return done(null, user ? user : false)
      } catch (err) {
        done(err, false)
      }
    })
  )
