const User = require("../models/User");
const Pile = require("../models/Pile");
const Chunk = require("../models/Chunk");
const express = require("express");
const router = express.Router();

module.exports = {
  get: (req, res, next) => {
    res.render('index');
  },
  main: (req, res, next) => {
    res.render('main');
  },
  pile: (req, res, next) => {
    Pile.findById(req.user.pile).populate('elements')
      .then(pile => {
        let promises = pile.elements.map(e => Chunk.findById(e.chunk));
        return Promise.all(promises);
      })
      .then(chunks =>{
        res.render('main', {chunks});
      })
      .catch(err => next(err));
  },
  random: (req, res, next) => {
    Chunk.find()
      .then(chunks => {
        let randomChunk = chunks[Math.floor(Math.random() * chunks.length)];
        res.render('chunk/random', {chunk : randomChunk});
      })
      .catch(err => next(err));
  }
};

// Comment to commit. For renaming purposes
