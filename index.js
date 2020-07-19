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
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);

require("./passport-config")(passport);
app.use(passport.initialize());

routes(app);

// const db_method = require("./db");
// db_method().then((d) => {
//   // d.forEach((doc) => {
//   //   console.log(doc.data().user);
//   //   console.log(doc.data().pass);
//   // });
//   console.log(d.docs[0].data().user);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
