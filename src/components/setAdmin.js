const admin = require('firebase-admin');
const serviceAccount = require('./../../../code/domanapp-64d6b7acda2b.json'); // Update the path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = '3ZZk5b2mnlMjLGwZOoUMXH4hxi43'; // Replace with the UID of the user you want to make an admin

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`Admin claim added to user with UID: ${uid}`);
  })
  .catch((error) => {
    console.error('Error setting admin claims:', error);
  });
