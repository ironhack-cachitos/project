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
<<<<<<< HEAD
  findOnePost: (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: {
          username: req.body.user,
          password: req.body.password,
          email: req.body.email,
          //avatar: req.body.avatar,
          avatar: `/uploads/user-picture/${req.file.filename}`,
          avatar_name: req.file.originalname
        }
=======
  findOneEdit: (req, res) => {
    let layout = req.query.layout ? req.query.layout : "layout";
    const userId = req.query.id;
    User.findById(userId)
      .then(selectedUser => {
        res.render("user/edit", { selectedUser, layout: layout });
>>>>>>> prieto
      })
      .catch(err => next(err));
  },
  findOnePost: (req, res, next) => {
    console.log(req.file);
    User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        avatar: `/uploads/user-picture/${req.file.filename}`
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
