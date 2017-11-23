const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/User");

module.exports = {
  findGet: (req, res) => {
    let layout = req.query.layout ? req.query.layout : "layout";
    const userId = req.query.id;
    User.findById(userId)
      .then(selectedUser => {
        res.render("user/index", { selectedUser, layout: layout });
      })
      .catch(err => next(err));
  },
  findOneEdit: (req, res) => {
    let layout = req.query.layout ? req.query.layout : "layout";
    const userId = req.query.id;
    User.findById(userId)
      .then(selectedUser => {
        res.render("user/edit", { selectedUser, layout: layout });
      })
      .catch(err => next(err));
  },
  findOnePost: (req, res, next) => {
    let avatar = req.file ? `/uploads/user-pictures/${req.file.filename}` : req.body.avatar;
    User.findByIdAndUpdate(req.params.id, {
      $set: {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        githubUrl: req.body.githubUrl,
        avatar: avatar
      }
    })
      .then(() => res.redirect("/main"))
      .catch(err => next(err));
  },
  deleteGet: (req, res, next) => {
    let layout = req.query.layout ? req.query.layout : "layout";
    User.findById(req.query.id)
      .then(user => {
        return res.render("user/delete-confirm", {
          user,
          layout: layout
        });
      })
      .catch(err => next(err));
  },
  deletePost: (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
    .then(() => {
        return res.redirect("/main");
      })
      .catch(err => next(err));
  }
};
