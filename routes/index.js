// const express = require('express');
// const router  = express.Router();

// /* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

// module.exports = router;


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    user: req.user
  });
});

module.exports = router;