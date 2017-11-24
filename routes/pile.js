const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const PileController = require("../controllers/PileController");


router.get("/", PileController.index);
router.get("/detail", PileController.detail);
router.get("/:id/type/:language", PileController.language);

module.exports = router;
