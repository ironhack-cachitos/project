const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport/github");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");

module.exports = {
  loginGet: (req, res, next) => {
    res.render("auth/login", { message: req.flash("error") });
  },
  loginGetModal: (req, res, next) => {
    res.render("auth/login", { layout: 'modals', message: req.flash("error") });
  },
  loginPost: passport.authenticate("local", {
    //successReturnToOrRedirect: "/main",
    successRedirect: "/main",
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
    res.render("auth/signup", {});
  },
  signupPost: (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "" || password === "") {
      res.render("auth/signup", {
        message: "Indicate username and password"
      });
      return;
    }
    User.findOne({ username }, "username", (err, user) => {
      if (user !== null) {
        res.render("auth/signup", { message: "The username already exists" });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = new User({
        username,
        password: hashPass
      });
      newUser.save(err => {
        if (err) {
          res.render("auth/signup", { message: "Something went wrong" });
        } else {
          res.redirect("/");
        }
      });
    });
  }
};
