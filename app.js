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
const MongoStore = require("connect-mongo")(session);
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const User = require("./models/User");
const multer = require("multer");

const databaseURL = "mongodb://localhost/ih-cachitos";
mongoose.connect(databaseURL, { useMongoClient: true });

const passport = require("passport");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));
app.use(layouts);

app.use(
  session({
    secret: "cachitos",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(flash());
require("./passport/serializers");
require("./passport/local");
require("./passport/github");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.title = "Cachitos de Ironhack";
  next();
});

const index = require("./routes/index");
const auth = require("./routes/auth");
const userRoutes = require("./routes/user");
const pile = require("./routes/pile");
const chunks = require("./routes/chunks");

app.use("/", index);
app.use("/", auth);
app.use("/pile", pile);
app.use("/chunk", chunks);
app.use("/user", userRoutes);

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
