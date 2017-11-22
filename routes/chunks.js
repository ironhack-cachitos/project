const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const ChunkController = require("../controllers/ChunkController");

router.get("/new", ensureLoggedIn("/"), ChunkController.getNew);
router.post("/new", ensureLoggedIn("/"), ChunkController.postNew);

router.get("/detail", ensureLoggedIn("/"), ChunkController.getDetail);

router.get("/edit", ensureLoggedIn("/"), ChunkController.getEdit);
router.post("/edit", ensureLoggedIn("/"), ChunkController.postEdit);

router.get("/delete", ensureLoggedIn("/"), ChunkController.getDelete);
router.post("/delete", ensureLoggedIn("/"), ChunkController.postDelete);

router.post("/add", ensureLoggedIn("/"), ChunkController.postAdd);

module.exports = router;
