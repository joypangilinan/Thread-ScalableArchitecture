var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var jwt = require('jsonwebtoken')

var config = require('../configs/db')

exports.local = passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = function (user) {
    return jwt.sign(user, config.secret,
        { expiresIn: 3600 })
}

var opts = {}
var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};
opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = config.secret


exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload)
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false)
            } else if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }))

exports.verifyUser = passport.authenticate('jwt', { session: false })