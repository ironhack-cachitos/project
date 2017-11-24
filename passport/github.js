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
      console.log(profile);

      // if (profile._json.id) {
      //   let githubId = profile._json.id;
      // }
      // if (profile._json.name) {
      //   let fullname = profile._json.name;
      // }
      // if (profile._json.login) {
      //   let username = profile._json.login;
      // }
      // if (profile._json.email) {
      //   let email = profile._json.email;
      // }
      // if (profile._json.avatar_url) {
      //   let avatar = profile._json.avatar_url;
      // }
      // if (profile._json.html_url) {
      //   let githubUrl = profile._json.html_url;
      // }

      let githubId = profile._json.id ? profile._json.id : '';
      let fullname = profile._json.name ? profile._json.name : '';
      let username = profile._json.login ? profile._json.login : '';
      let email = profile._json.email ? profile._json.email : '';
      let avatar = profile._json.avatar_url?  profile._json.avatar_url : '';
      let githubUrl = profile._json.html_url ? profile._json.html_url : '';

      const newUser = new User({
        token: accessToken,
        githubId,
        fullname,
        username,
        email,
        githubUrl,
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
