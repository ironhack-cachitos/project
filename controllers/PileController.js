const User = require("../models/User");
const Pile = require("../models/Pile");
const Chunk = require("../models/Chunk");
const express = require("express");
const router = express.Router();

module.exports = {
  index: (req, res, next) => {
    Pile.find()
      .then(pile => {
        res.render("piles/index", {pile});
      })
      .catch(err => next(err));
  },
  detail: (req, res, next) => {
    Pile.findById(req.user.pile).populate('elements')
      .then(pile => {
        let promises = pile.elements.map(e => Chunk.findById(e.chunk));
        return Promise.all(promises);
      })
      .then(chunks =>{
        res.render('pile/list', {chunks});
      })
      .catch(err => next(err));
  },
  language: (req, res, next) => {
    let lang = req.query.lang;
    Pile.findById(req.user.pile).populate('elements')
      .then(pile => {
        console.log(pile);
      })
      .catch(err => next(err));
  }
};
