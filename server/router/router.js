const express = require("express");
const User = require("../models/models");
const passport = require("passport");
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy( async (username, password, done) => {
    try {
        const user = await User.findOne({ username });

        if (!user) return done(null, false);

        if (user.password !== password) return done(null, false);

        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
}
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error, flase);
    }
})

router.post("/register", async (req, res) => {

    const { username, password, email } = req.body;

    try {
        const user = await User.create({
            username: username,
            email: email,
            password: password,
        });

        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json(null);
    }
})

router.post("/login", passport.authenticate('local') ,(req , res) => {
    console.log("Log In");
    res.send(req.user);
})

router.post("/logout" , (req , res) => {
    req.logout();
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.send();
})

module.exports = router;