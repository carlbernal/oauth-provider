const firestore = require('@google-cloud/firestore')

const db = new firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: './firebase-db-key.json'
})

module.exports = db;
