const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/error", (req, res) => {
  res.send("<h1>login error</h1");
});

router.get("/success", (req, res) => {
  res.send("<h1>login success</h1");
});

router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/oauth/success",
    failureRedirect: "/oauth/error",
  })(req, res, next);
  // res.render("login");
});

module.exports = router;
