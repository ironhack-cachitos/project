const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/UserController");
const { ensureLoggedIn } = require("connect-ensure-login");

router.get("/:id", ensureLoggedIn("/"), userRouter.findGet);
router.get("/edit/:id", ensureLoggedIn("/"), userRouter.findOneGet);
router.post("/edit/:id", ensureLoggedIn("/"), userRouter.findOnePost);
router.post("/delete/:id", ensureLoggedIn("/"), userRouter.delete);

module.exports = router;
