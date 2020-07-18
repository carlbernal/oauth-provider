require("dotenv").config();
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes");

const app = express();

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: "pewdiepie",
    saveUninitialized: true,
    resave: false,
  })
);

routes(app);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
