const LocalStragey = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("./db");

const accountsRef = db.collection("testing-accounts");

module.exports = (passport) => {
  passport.use(
    new LocalStragey(async (username, password, done) => {
      try {
        const user = await accountsRef.where("username", "==", username).get();

        if (user.empty) {
          return done(null, false, { message: "Incorrect username" });
        }

        // Compare password hash
        const match = await bcrypt.compare(
          password,
          user.docs[0].data().password
        );

        if (match) {
          return done(null, user.docs[0]);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (e) {
        console.log(e);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await accountsRef.doc(id).get();
      if (user.exists) {
        done(null, user);
      }
    } catch (e) {
      console.log(e);
    }
  });
};
