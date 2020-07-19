const express = require("express");
const bcrpyt = require("bcrypt");
const uuid = require("uuid");
const router = express.Router();
const db = require("../db");

const accountsRef = db.collection("testing-accounts");
const clientRef = db.collection("clients");

router.get("/", async (req, res) => {
  const users = await accountsRef.limit(25).get();
  const clients = await clientRef.limit(25).get();
  res.render("index", {
    users: users.docs.map((doc) => doc.data()),
    clients: clients.docs.map((doc) => doc.data()),
  });
});

router.post("/account", async (req, res) => {
  try {
    const user = await accountsRef
      .where("username", "==", req.body.username)
      .get();
    if (!user.empty) {
      // username already taken
      //TODO: add proper flash alert
      res.redirect("/", 409);
    } else {
      const username = req.body.username;
      let password = await bcrpyt.hash(req.body.password, 10);
      await accountsRef.add({
        username: username,
        password: password,
      });
    }
  } catch (e) {
    console.log(e);
  }

  res.redirect("/");
});

router.delete("/account/:username", async (req, res) => {
  try {
    const user = await accountsRef
      .where("username", "==", req.params.username)
      .get();
    await accountsRef.doc(user.docs[0].id).delete();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

router.post("/client", async (req, res) => {
  try {
    const client = await clientRef.where("name", "==", req.body.name).get();
    if (!client.empty) {
      // client already taken
      //TODO: add proper flash alert
      res.redirect("/", 409);
    } else {
      const name = req.body.name;
      await clientRef.add({
        name: name,
        client_id: uuid.v4(),
        client_secret: uuid.v4(),
      });
    }
  } catch (e) {
    console.log(e);
  }

  res.redirect("/");
});

router.delete("/client/:name", async (req, res) => {
  try {
    const user = await clientRef.where("name", "==", req.params.name).get();
    await clientRef.doc(user.docs[0].id).delete();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

module.exports = router;
