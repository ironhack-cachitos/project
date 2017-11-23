const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const User = require("../models/User");
const Pile = require("../models/Pile");

require("dotenv").config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK = process.env.GITHUB_CALLBACK;

// Initialize GitHubStrategy

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK
    },
     (accessToken, refreshToken, profile, next) => {
    User.findOne({ githubId: profile.id }, (err, user) => {
      if (err) { return next(err); }
      if (user) { return next(null, user); }
    //function(accessToken, refreshToken, profile, done) {
      if (profile._json.id) {
        var githubId = profile._json.id;
      }
      if (profile._json.name) {
        var name = profile._json.name;
      }
      if (profile._json.login) {
        var username = profile._json.login;
      }
      if (profile._json.email) {
        var email = profile._json.email;
      }
      if (profile._json.avatar_url) {
        var avatar = profile._json.avatar_url;
      }

      const newUser = new User({
        token: accessToken,
        githubId,
        name,
        username,
        email,
        avatar
      });
      const newPile = new Pile({
        owner : newUser._id,
        elements : []
      });
      User.create(newUser)
        .then(user => {
          return Pile.create(newPile);
        })
        .then((pile) => {
          return User.findByIdAndUpdate(pile.owner, { $set: { pile: pile._id }});
        })
        .then((user) => {
          return next(null, user);
        })
        .catch(err => { next (err);});

      //  newUser.save((err) => {
      //   if (err) { return cb(err); }
      //   cb(null, newUser);
      // });

    });
  })
);
      // User.create(newUser, function(err, user) {
      //   if (err) {return done(err, user);}
      //   return done(err, user)

      // });
