const LocalStragey = require('passport-local').Strategy;
const db = require('./db');

const accountsRef = db.collection('testing-accounts');

module.exports = (passport) => { 
  passport.use(new LocalStragey(
    async (username, password, done) => {
      try {
        const doc = await accountsRef.where('user', '==', username).get();

        if (doc.empty) {
          return done(null, false, { message: 'Incorrect username'});
        }

        // Get first match
        if (doc.docs[0].data().pass == password) {
          return done(null, doc.docs[0].data())
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      } catch (e) {
        console.log(e);
      }
  }));

  // TODO: add login session 
}