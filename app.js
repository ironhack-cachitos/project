const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate"); 
const session = require("express-session");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const User = require("./models/User");
mongoose.connect("mongodb://localhost/ih-cachitos");

const passport = require("./passport/config");
const app = express();

app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});
app.use(flash());
passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(null, false, { message: "Incorrect username" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return next(null, false, { message: "Incorrect password" });
        }

        return next(null, user);
      });
    }
  )
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout");
// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(layouts);

const index = require("./routes/index");
const auth = require("./routes/auth");
const main = require("./routes/main");
const authRoutes = require("./routes/auth-routes");

app.use("/", index);
app.use("/", authRoutes);
app.use("/auth", auth);
app.use("/main", main);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
