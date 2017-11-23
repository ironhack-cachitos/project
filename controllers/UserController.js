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
        res.render("user/edit", {selectedUser, layout: layout})
      })
      .catch(err => next(err));
  },
  findOnePost: (req, res, next) => {
    console.log(req.file)
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
  delete: (req, res) => {
    const userID = req.params.id;
    User.findByIdAndRemove(userID)
      .then(() => res.redirect("/"))
      .catch(err => next(err));
  }
};
