const express = require("express");
const router = express.Router();
const passport = require("passport");
//require("../passport/github");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
//const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");

module.exports = {
  loginGet: (req, res, next) => {
    let layout = req.query.layout ? req.query.layout : 'layout';
    res.render("auth/login", { layout: layout, message: req.flash("error") });
  },
  loginPost: passport.authenticate("local-login", {
    successReturnToOrRedirect: "/main",
    //successRedirect: "/main",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }),
  gitHubGet: passport.authenticate("github", {
    scope: ["user:email"]
  }),
  gitHubGetCallback: passport.authenticate("github", {
    successRedirect: "/main",
    failureRedirect: "/login"
  }),
  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },
  signupGet: (req, res, next) => {
    let layout = req.query.layout ? req.query.layout : 'layout';
    res.render("auth/signup", { layout: layout});
  },
  signupPost: passport.authenticate('local-signup', {
    successReturnToOrRedirect: "/main",
    //successRedirect : '/',
    failureRedirect : '/'
  })
};
