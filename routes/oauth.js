const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const passport = require("passport");
const db = require("../db");

const clientRef = db.collection("clients");

router.get("/authorize", (req, res) => {
  req.session.client_id = req.query.client_id;
  req.session.redirect_uri = req.query.redirect_uri;
  req.session.response_type = req.query.response_type;
  req.session.scope = req.query.scope;
  // TODO: check if response_type is auth code or implicit code
  // TODO: create flow for implicit code
  res.render("login");
});

router.post("/token", async (req, res) => {
  const client_id = req.body.client_id;
  const client_secret = req.body.client_secret;
  const grant_type = req.body.grant_type;
  const code = req.body.code;
  // const redirect_uri = req.body.redirect_uri;

  // TODO: add error when code is not found
  try {
    if (!grant_type === "authorization_code") {
      // other grant type not supported yet
      // TODO: add missing param error message
      res.status(400);
    }

    const client = await clientRef
      .where("client_id", "==", client_id)
      .where("client_secret", "==", client_secret)
      .where("code", "==", code)
      .get();

    const access_token = uuid.v4();
    await clientRef
      .doc(client.docs[0].id)
      .update({ access_token: access_token });

    res.status(200).json({
      access_token: access_token,
      token_type: "bearer",
    });
  } catch (e) {
    // TODO: add missing param error message
    res.status(400);
  }
});

router.get("/error", (req, res) => {
  // Login failed
  // TODO: add login failed error message
  res.status(400).redirect(req.session.redirect_uri);
});

// TODO: any client should not have the ability to call this explicitly
// TODO: This should only be called by '/oauth/'
// For debug purpose only
router.get("/success", async (req, res) => {
  try {
    const code = uuid.v4();
    const client = await clientRef
      .where("client_id", "==", req.session.client_id)
      .get();

    // TODO: add timer to auth code
    await clientRef.doc(client.docs[0].id).update({ code: code });

    res.status(200).redirect(req.session.redirect_uri + "?code=" + code);
  } catch (e) {
    console.log(e);
    // Param missing
    // TODO: add missing param error message
    res.status(400).redirect(req.session.redirect_uri);
  }
});

router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/oauth/success",
    failureRedirect: "/oauth/error",
  })(req, res, next);
});

module.exports = router;
