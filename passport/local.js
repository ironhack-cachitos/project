const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const Pile = require("../models/Pile");
const bcrypt = require("bcrypt");

passport.use('local-login', new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err, { message: err });
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }
      return next(null, user);
    });
  })
);

passport.use('local-signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, next) => {
    process.nextTick(() => {
        User.findOne({
            'username': username
        }, (err, user) => {
            if (err){
              return next(err, { message: "Algo ha pasado"});
            }
            if (user) {
                return next(null, false, { message: "El nombre de usuario ya existe"});
            } else {
                // Destructure the body
                const { username, email, password } = req.body;
                const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                const newUser = new User({
                  username,
                  email,
                  password: hashPass
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
                // (err) => {
                //     if (err){ next(err); }
                //     return next(null, newUser);
                // });
            }
        });
    });
}));
