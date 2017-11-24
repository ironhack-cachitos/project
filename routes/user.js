const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/UserController");
const { ensureLoggedIn } = require("connect-ensure-login");
const multer = require("multer");
const UPLOADS_URL = process.env.UPLOADS_URL;
const upload = multer({ dest: UPLOADS_URL });

router.get("/", ensureLoggedIn("/"), userRouter.findGet);
router.get("/edit", ensureLoggedIn("/"), userRouter.findOneEdit);
router.post("/edit/:id", ensureLoggedIn("/"), upload.single('avatar'), userRouter.findOnePost);
//funcionalidad futura
// router.get("/delete", ensureLoggedIn("/"), userRouter.deleteGet);
// router.post("/delete/:id", ensureLoggedIn("/"), userRouter.deletePost);

module.exports = router;
