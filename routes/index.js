const express = require('express');
const router  = express.Router();
const indexRouter = require('../controllers/IndexController');
const pileRouter = require('../controllers/PileController');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/', ensureLoggedOut('/main'), indexRouter.get);
router.get('/main', ensureLoggedIn('/'), indexRouter.pile);

module.exports = router;
