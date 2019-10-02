var express = require('express');
var bodyParser = require('body-parser')
var passport = require('passport')
const authenticate = require('../../../middlewares/authgaurd');
const User = require('../../../models/user');

const register = (req, res, next) => {
    User.register(new User({ username: req.body.username }),
        req.body.password, (err, user) => {
            if (err) {
                err = new Error('A user with the given username is already registered')
                return next(err)
            }
            else {
                passport.authenticate('local')(req, res, () => {
                    console.log('Registration Successful')
                    res.json("Register user successfully")
                })
            }
        })
}

const login = (req, res, next) => {
    passport.authenticate('local')(req, res, () => {
        token = authenticate.getToken({ _id: req.user._id })
        res.cookie('token', token)
        console.log(token)
        res.end('sucessfully login')
    })
}


module.exports = {
    register: register,
    login: login
}