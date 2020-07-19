require("dotenv").config();
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");

const routes = require("./routes");

const app = express();

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("common"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
  })
);

require("./passport-config")(passport);
app.use(passport.initialize());
app.use(passport.session());

routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
