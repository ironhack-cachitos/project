const User = require("../models/User");
const Pile = require("../models/Pile");
const express = require("express");
const router = express.Router();

module.exports = {
  index: (req, res, next) => {
    Pile.find({}, (err, pile) => {
      res.render("piles/index", {
        pile: pile
      });
    });
  },
  detail: (req, res, next) => {
    Pile.findById(req.params.userId, (err, pile) => {
      if (err) {
        console.log(err);
      }
      user.find(
        {
          pileId: req.params.id
        },
        (err, pile) => {
          res.render("piles/index", {
            pile: pile,
            user: res.locals.user
          });
        }
      );
    });
  },
  lenguage: (req, res, next) => {
    let languageList = ''
    Pile.find({}).populate("user")
          .then(languages => {
            languageList = pile
            return User.find(Pile.languages,{})
  }
)},
};