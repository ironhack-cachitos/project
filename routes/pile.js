const PileController = require("../controllers/PileController");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/User");



router.get("/pile/:id/", PileController.detail);
//router.get("/pile/:id/type/:language", PileController.lenguage);

module.exports = router;