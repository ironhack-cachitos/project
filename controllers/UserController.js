const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/User");
const multer = require("multer");
const upload = multer({ dest: process.env.UPLOADS_URL });

module.exports = {
  findGet: (req, res) => {
    User.find().then(users => {
      res.render("/user/index");
    });
  },
  findOneGet: (req, res) => {
    User.findById(req.params.id)
      .then(selectedUser => res.render("/users/edit", { selectedUser }))
      .catch(err => next(err));
  },
  findOnePost: (req, res) => {
    ser
      .findByIdAndUpdate(req.params.id, {
        $set: {
          username: req.body.user,
          password: req.body.password,
          email: req.body.email,
          //avatar: req.body.avatar,
          avatar: `/uploads/user-picture/${req.file.filename}`,
          avatar_name: req.file.originalname
        }
      })
      .then(() => res.redirect("/main"))
      .catch(err => next(err));
  },
  delete: (req, res) => {
    const userID = req.params.id;
    User.findByIdAndRemove(userID)
      .then(() => res.redirect("/users"))
      .catch(err => next(err));
  }
};
