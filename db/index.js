const firestore = require('@google-cloud/firestore')

const db = new firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: './firebase-db-key.json'
})

module.exports = db;

// module.exports = async function create_testing_account (){
//   const docRef = db.collection('testing-accounts').doc('default')
//   await docRef.set({
//     user: 'admin',
//     pass: 'admin'
//   })
// }

// module.exports = async function db_method (){
//   const docRef = db.collection('testing-accounts');
//   const doc = await docRef.where('user', '==', 'admin').get();
//   return doc
// }