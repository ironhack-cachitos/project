const express = require("express");

const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

router.get("/", ensureAuthenticated, (req, res) => {
  const gh = new GitHub({
    username: req.user.username,
    token:    req.user.token
  });
  
  me = gh.getUser();
  me.listRepos((err, privateRepos) => {
    res.render("views/main", {
      user: req.user,
      privateRepos
    });
  });
});
module.exports = router;
