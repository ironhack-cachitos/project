const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/UserController");
const { ensureLoggedIn } = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: process.env.UPLOADS_URL });

router.get("/", ensureLoggedIn("/"), userRouter.findGet);
router.get("/edit", ensureLoggedIn("/"), userRouter.findOneGet);
router.post("/edit", [upload.single('avatar'), ensureLoggedIn("/")], userRouter.findOnePost);
router.post("/delete", ensureLoggedIn("/"), userRouter.delete);

module.exports = router;
