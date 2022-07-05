import * as express from "express"
import * as passport from "passport"
import * as GoogleStrategy from "passport-google-oauth2"

function initializePassport() {
    passport.use(new GoogleStrategy.Strategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLINET_SECRET,
        callbackURL: "https://localhost:8000/auth/google/callback",
        scope: ["profile", "email"],
        passReqToCallback: true,
    },
        function verify(req, accessToken, refreshToken, profile, done) {
            console.log("Access Token :", accessToken)
            return done(null, {})
        }
    ))


    return passport
}



export default initializePassport