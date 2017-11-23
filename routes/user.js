const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/UserController");
const { ensureLoggedIn } = require("connect-ensure-login");
const multer = require("multer");
//const upload = multer({ dest: process.env.UPLOADS_URL });
const upload = multer({ dest: "../uploads/user-pictures" });

router.get("/", ensureLoggedIn("/"), userRouter.findGet);
router.get("/edit", ensureLoggedIn("/"), userRouter.findOneEdit);
router.post("/edit/:id", ensureLoggedIn("/"), upload.single('avatar'), userRouter.findOnePost);
router.post("/delete", ensureLoggedIn("/"), userRouter.delete);

module.exports = router;
