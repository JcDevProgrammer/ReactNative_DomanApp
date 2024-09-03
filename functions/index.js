const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteUserAndDocument = functions.https.onCall(async (data, context) => {
  console.log("Received request to delete user and document:", data);

  // Check if the request is authenticated and if the user is an admin
  if (!context.auth || !context.auth.token.admin) {
    console.error("Permission denied: Only admins can perform this action.");
    throw new functions.https.HttpsError("permission-denied", "Only admins can perform this action.");
  }

  const {docId, collectionName} = data;
  if (!docId || !collectionName) {
    console.error("Invalid argument: Document ID and collection name are required.");
    throw new functions.https.HttpsError("invalid-argument", "Document ID and collection name are required.");
  }

  try {
    console.log(`Deleting document ID: ${docId} from collection: ${collectionName}`);
    await admin.firestore().collection(collectionName).doc(docId).delete();

    const otherCollectionName = collectionName === "Ardana" ? "Donator" : "Ardana";
    console.log(`Checking other collection: ${otherCollectionName}`);
    const otherDocSnapshot = await admin.firestore().collection(otherCollectionName).doc(docId).get();
    if (otherDocSnapshot.exists) {
      console.log(`Deleting document ID: ${docId} from other collection: ${otherCollectionName}`);
      await admin.firestore().collection(otherCollectionName).doc(docId).delete();
    }

    if (collectionName === "Ardana" || collectionName === "Donator") {
      const currentAdminUid = context.auth.uid;
      if (docId !== currentAdminUid) {
        console.log(`Deleting user with ID: ${docId}`);
        await admin.auth().deleteUser(docId);
      } else {
        console.error("Permission denied: Admin user cannot be deleted.");
        throw new functions.https.HttpsError("permission-denied", "Admin user cannot be deleted.");
      }
    }

    return {success: true};
  } catch (error) {
    console.error("Error deleting user or document:", error);
    throw new functions.https.HttpsError("internal", "Error deleting user or document.", error);
  }
});
