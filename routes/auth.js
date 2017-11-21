const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport/github");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");
const AuthController = require('../controllers/AuthController');

router.get("/login", AuthController.loginGet);
router.post("/login", AuthController.loginPost);
router.get("/github", AuthController.gitHubGet);
router.get("/github/callback", AuthController.gitHubGetCallback);
router.get("/logout", AuthController.logout);

//pagina privada
// // router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
// //   res.render("auth/main", { user: req.user });
// // });

router.get("/signup", AuthController.signupGet);
router.post("/signup", AuthController.signupPost)

//pagina privada
// router.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("passport/private", { user: req.user });
// });

module.exports = router;
