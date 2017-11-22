const express = require("express");
const router = express.Router();
const passport = require("passport");
// require("../passport/github");
// const bcrypt = require("bcrypt");
// const bcryptSalt = 10;
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/User");
const AuthController = require('../controllers/AuthController');

router.get("/login", ensureLoggedOut('/'), AuthController.loginGet);
router.post("/login", ensureLoggedOut('/'), AuthController.loginPost);
router.get("/auth/github", AuthController.gitHubGet);
router.get("/auth/github/callback", AuthController.gitHubGetCallback);
router.get("/logout", ensureLoggedIn('/'), AuthController.logout);

router.get("/signup", ensureLoggedOut('/'), AuthController.signupGet);
router.post("/signup", ensureLoggedOut('/'), AuthController.signupPost);

//pagina privada
// router.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("passport/private", { user: req.user });
// });

module.exports = router;
