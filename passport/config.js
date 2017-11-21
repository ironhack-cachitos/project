const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const findOrCreate = require("mongoose-findorcreate"); 

require("dotenv").config();

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Initialize GitHubStrategy
const User = require("../models/User");
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
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

      let newUser = new User({
        token: accessToken,
        githubId,
        name,
        username,
        email,
        avatar
      });
      //console.log(typeof newUser);
     // console.log(typeof newUser.token);

      User.create(newUser, function(err, user) {
        if (err) {return done(err, user);}
        return done(err, user)

      });
    }
  )
);

module.exports = passport;

