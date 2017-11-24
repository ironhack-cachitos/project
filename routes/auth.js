const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/User");
const AuthController = require('../controllers/AuthController');

//Signup, Login, Login Social(GITHUB) and Logout
router.get("/login", ensureLoggedOut('/'), AuthController.loginGet);
router.post("/login", ensureLoggedOut('/'), AuthController.loginPost);
router.get("/auth/github", AuthController.gitHubGet);
router.get("/auth/github/callback", AuthController.gitHubGetCallback);
router.get("/logout", ensureLoggedIn('/'), AuthController.logout);
router.get("/signup", ensureLoggedOut('/'), AuthController.signupGet);
router.post("/signup", ensureLoggedOut('/'), AuthController.signupPost);

module.exports = router;
