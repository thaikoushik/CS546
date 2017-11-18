const express = require('express');
const router = express.Router();
const passport = require('passport');
const userData = require("../data/users");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(async function(user, done) {
    var userDeserialize = await findUserbyId(user._id);
    if (user) {
        done(null, user);
    }
});

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async function(req, username, password, done) {
    try {
        const user = await finduser(username);
        bcrypt.compare(password, user.hashedPassword, (error, isValid) => {
            if (error) {
                return done(error);
            }
            if (!isValid) {
                return done(null, false, { "message": "Incorrect Password " });
            }
            return done(null, user);
        });
    } catch (e) {
        return done(null, false, { "message": e });
    }
}));

router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.render('private', {user: req.user});
    }else {
        var messages = req.flash('error');
        res.render('login', { messages: messages, hasErrors: messages.length > 0 });
    }
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {

    if (req.session.oldurl) {
        var oldUrl = req.session.oldurl;
        req.session.oldurl = null;
        res.direct(oldUrl);
    } else {

        res.redirect('/private');
    }
});

router.get('/private', isLoggedIn, (req, res) => {
    res.render('private', { user: req.user });
});

router.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

async function finduser(username) {
    try {
        //const users = userData.users;
        let user = userData.filter((obj) => {
            return obj.username === username;
        })[0];

        if (user === undefined) {
            throw "There is no user with this username";
        } else {
            return user;
        }
    } catch (e) {
        throw e;
    }
}

async function findUserbyId(id) {
    try {
        // const users = userData.users;
        let user = userData.filter((obj) => {
            return obj._id === id;
        })[0];
        if (user === undefined) {
            throw "no user";
        } else {
            return user;
        }
    } catch (e) {
        throw e;
    }
}