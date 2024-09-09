/* eslint-disable max-len */
const functions = require("firebase-functions");
// Import the Firebase Functions module to create and manage cloud functions
const admin = require("firebase-admin");
// Import the Firebase Admin SDK to interact with Firebase services

admin.initializeApp();
// Initialize the Firebase Admin SDK to use its services within the Cloud Function

exports.deleteUserAndDocument = functions.https.onCall(async (data, context) => {
  // Define a callable Cloud Function to delete a user and their associated Firestore document
  console.log("Received request to delete user and document:", data);
  // Log the incoming request data for debugging purposes

  // Check if the request is authenticated and if the user has admin privileges
  if (!context.auth || !context.auth.token.admin) {
    console.error("Permission denied: Only admins can perform this action.");
    // Log an error message if the user is not authenticated or lacks admin rights
    throw new functions.https.HttpsError("permission-denied", "Only admins can perform this action.");
    // Throw a permission-denied error to inform the client
  }

  const {docId, collectionName} = data;
  // Extract the document ID and collection name from the data passed to the function
  if (!docId || !collectionName) {
    // Check if both the document ID and collection name are provided
    console.error("Invalid argument: Document ID and collection name are required.");
    // Log an error if either is missing
    throw new functions.https.HttpsError("invalid-argument", "Document ID and collection name are required.");
    // Throw an invalid-argument error to inform the client
  }

  try {
    console.log(`Deleting document ID: ${docId} from collection: ${collectionName}`);
    // Log the action of deleting the specified document from the specified collection
    await admin.firestore().collection(collectionName).doc(docId).delete();
    // Delete the document with the given ID from the specified Firestore collection

    const otherCollectionName = collectionName === "Ardana" ? "Donator" : "Ardana";
    // Determine the name of the other collection to check for a corresponding document
    console.log(`Checking other collection: ${otherCollectionName}`);
    // Log the action of checking the other collection for the same document ID
    const otherDocSnapshot = await admin.firestore().collection(otherCollectionName).doc(docId).get();
    // Retrieve the document from the other collection
    if (otherDocSnapshot.exists) {
      // Check if the document exists in the other collection
      console.log(`Deleting document ID: ${docId} from other collection: ${otherCollectionName}`);
      // Log the action of deleting the document from the other collection
      await admin.firestore().collection(otherCollectionName).doc(docId).delete();
      // Delete the document from the other Firestore collection
    }

    // Check if the collection is either "Ardana" or "Donator", which are associated with users
    if (collectionName === "Ardana" || collectionName === "Donator") {
      const currentAdminUid = context.auth.uid;
      // Get the UID of the current admin making the request
      if (docId !== currentAdminUid) {
        // Ensure the admin is not trying to delete their own user account
        console.log(`Deleting user with ID: ${docId}`);
        // Log the action of deleting the user account with the given ID
        await admin.auth().deleteUser(docId);
        // Delete the user account from Firebase Authentication
      } else {
        console.error("Permission denied: Admin user cannot be deleted.");
        // Log an error if the admin is attempting to delete their own account
        throw new functions.https.HttpsError("permission-denied", "Admin user cannot be deleted.");
        // Throw a permission-denied error to prevent this action
      }
    }

    return {success: true};
    // If all operations are successful, return a success response to the client
  } catch (error) { // Handle any errors that occur during the process
    console.error("Error deleting user or document:", error);
    // Log the error details for debugging purposes
    throw new functions.https.HttpsError("internal", "Error deleting user or document.", error);
    // Throw an internal error to inform the client of the failure
  }
});
