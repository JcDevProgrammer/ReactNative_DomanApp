import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from './../../../components/firebase';
import RedButton from '@/src/components/RedButton';
import { getFunctions, httpsCallable } from 'firebase/functions';

const db = getFirestore(app);
// Initialize Firestore using the Firebase app instance.

const auth = getAuth(app);
// Initialize Firebase Authentication using the Firebase app instance.

const functions = getFunctions(app);
// Initialize Firebase Cloud Functions using the Firebase app instance.

const BodyAdminAccept = () => {
  // Define a functional component called BodyAdminAccept.

  const [ardanaData, setArdanaData] = useState([]);
  // Use useState to manage the state of Ardana data, initializing it as an empty array.

  const [donatorData, setDonatorData] = useState([]);
  // Use useState to manage the state of Donator data, initializing it as an empty array.

  const [loading, setLoading] = useState(true);
  // Use useState to manage the loading state, initializing it as true to indicate data is being loaded.

  const fetchData = async () => {
    // Define an asynchronous function to fetch data from Firestore.

    try {
      const ardanaSnapshot = await getDocs(collection(db, 'Ardana'));
      // Fetch all documents from the 'Ardana' collection in Firestore.

      const ardanaDocuments = ardanaSnapshot.docs.map(doc => ({
        // Map the fetched documents to an array of objects, extracting the document ID and data.

        id: doc.id,
        collectionName: 'Ardana',
        // Include the document ID and collection name in the object.

        ...doc.data(),
        // Spread the remaining document data into the object.
      }));
      setArdanaData(ardanaDocuments);
      // Update the ardanaData state with the fetched Ardana documents.

      const donatorSnapshot = await getDocs(collection(db, 'Donator'));
      // Fetch all documents from the 'Donator' collection in Firestore.

      const donatorDocuments = donatorSnapshot.docs.map(doc => ({
        // Map the fetched documents to an array of objects, extracting the document ID and data.

        id: doc.id,
        collectionName: 'Donator',
        // Include the document ID and collection name in the object.

        ...doc.data(),
        // Spread the remaining document data into the object.
      }));
      setDonatorData(donatorDocuments);
      // Update the donatorData state with the fetched Donator documents.

    } catch (error) {
      console.error('Error fetching documents: ', error);
      // Log an error if there's an issue fetching the documents.
    } finally {
      setLoading(false);
      // Set the loading state to false, indicating that data fetching is complete.
    }
  };

  useEffect(() => {
    fetchData();
    // Call fetchData when the component is first mounted to fetch data from Firestore.
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
    // If loading is true, render an ActivityIndicator to show that data is being loaded.
  }

  const handleDelete = async (docId, collectionName) => {
    // Define an asynchronous function to handle the deletion of a document and user.

    try {
      console.log(`Deleting document ID: ${docId} from collection: ${collectionName}`);
      // Log the document ID and collection name that will be deleted.

      if (!collectionName || !docId) {
        console.error('Invalid collectionName or docId');
        // If either collectionName or docId is not provided, log an error and return early.

        return;
      }

      const deleteUserAndDocument = httpsCallable(functions, 'deleteUserAndDocument');
      // Call the 'deleteUserAndDocument' cloud function using httpsCallable.

      const result = await deleteUserAndDocument({ docId, collectionName });
      // Pass the document ID and collection name as parameters to the cloud function and wait for the result.

      if (result.data.success) {
        console.log(`User and document with ID ${docId} successfully deleted!`);
        // If the deletion is successful, log a success message.

        fetchData();
        // Refresh the data by calling fetchData again after deletion.

      } else {
        console.error('Failed to delete user or document');
        // If the deletion fails, log an error.
      }
    } catch (error) {
      console.error('Error removing document or user:', error);
      // Log any errors that occur during the deletion process.
    }
  };

  const renderItem = ({ item }) => (
    // Define a function to render each item in the FlatList.

    <View style={styles.containerAll}>
      {/* Container for each item */}

      <View style={styles.item}>
        {/* Container for the item's fields */}
        {Object.keys(item).filter(key => key !== 'id' && key !== 'collectionName').map((key) => (
          // Iterate over the item's keys, excluding 'id' and 'collectionName', to render the fields.
          <Text key={key} style={styles.field}>
            {/* Render each key-value pair as a Text component */}
            {key}: {JSON.stringify(item[key])}
          </Text>
        ))}
      </View>

      <View style={styles.containerButton}>
        {/* Container for the delete button */}
        <RedButton
          text="Delete"
          onPress={() => handleDelete(item.id, item.collectionName)}
          // Attach an onPress handler to the delete button, calling handleDelete with the item's id and collectionName.
        />
      </View>
    </View>
  );

  return (
    // Return the component's UI.

    <View style= {styles.containerAllReturn}>
      {/* Container for the entire UI */}

      <View style={styles.container}>
        {/* Container for Ardana documents */}
        <Text style={styles.title}>Ardana Documents</Text>
        {/* Title for Ardana section */}
        <FlatList
          data={ardanaData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          // Render a FlatList of Ardana documents, using renderItem to render each item.
        />
      </View>

      <View style={styles.container}>
        {/* Container for Donator documents */}
        <Text style={styles.title}>Donator Documents</Text>
        {/* Title for Donator section */}
        <FlatList
          data={donatorData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          // Render a FlatList of Donator documents, using renderItem to render each item.
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  containerAll:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderWidth:1,
    paddingTop:10
  },
  containerAllReturn:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    flex: 1,

  },
  containerButton:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 125, 

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    width: 230, 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,

  },
  field: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default BodyAdminAccept;