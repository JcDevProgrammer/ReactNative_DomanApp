import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs, getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, deleteUser } from 'firebase/auth'; // Import Firebase Authentication functions
import app from './../../../components/firebase';
import RedButton from '@/src/components/RedButton';

const db = getFirestore(app);
const auth = getAuth(app);

const BodyAdminAccept = () => {
  const [ardanaData, setArdanaData] = useState([]);
  const [donatorData, setDonatorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const ardanaSnapshot = await getDocs(collection(db, 'Ardana'));
      const ardanaDocuments = ardanaSnapshot.docs.map(doc => ({
        id: doc.id,
        collectionName: 'Ardana',
        ...doc.data(),
      }));
      setArdanaData(ardanaDocuments);

      const donatorSnapshot = await getDocs(collection(db, 'Donator'));
      const donatorDocuments = donatorSnapshot.docs.map(doc => ({
        id: doc.id,
        collectionName: 'Donator',
        ...doc.data(),
      }));
      setDonatorData(donatorDocuments);
    } catch (error) {
      console.error('Error fetching documents: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleDelete = async (docId, collectionName) => {
    try {
      console.log(`Deleting document ID: ${docId} from collection: ${collectionName}`);
      
      if (!collectionName || !docId) {
        console.error('Invalid collectionName or docId');
        return;
      }

      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      console.log(`Document from ${collectionName} successfully deleted!`);

      const otherCollectionName = collectionName === 'Ardana' ? 'Donator' : 'Ardana';
      const otherDocSnapshot = await getDocs(collection(db, otherCollectionName));
      const otherDoc = otherDocSnapshot.docs.find(doc => doc.id === docId);

      if (otherDoc) {
        const otherDocRef = doc(db, otherCollectionName, docId);
        await deleteDoc(otherDocRef);
        console.log(`Document from ${otherCollectionName} successfully deleted!`);
      } else {
        console.log(`No document found in ${otherCollectionName} with ID: ${docId}`);
      }

      // Delete the user's authentication if the document is from 'Ardana'
      if (collectionName === 'Ardana') {
        const userAuth = auth.currentUser; // Get the current admin user
        const user = await auth.getUser(docId); // Fetch the user by UID

        if (user && user.uid !== userAuth.uid) {
          await deleteUser(user);
          console.log(`User with UID ${docId} successfully deleted from Firebase Auth!`);
        } else {
          console.log('Admin user cannot be deleted');
        }
      }

      fetchData();
    } catch (error) {
      console.error("Error removing document or user: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {Object.keys(item).filter(key => key !== 'id' && key !== 'collectionName').map((key) => (
        <Text key={key} style={styles.field}>
          {key}: {JSON.stringify(item[key])}
        </Text>
      ))}
      <RedButton
        text="Delete"
        onPress={() => handleDelete(item.id, item.collectionName)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ardana Documents</Text>
      <FlatList
        data={ardanaData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
     
      <Text style={styles.title}>Donator Documents</Text>
      <FlatList
        data={donatorData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
  },
  field: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default BodyAdminAccept;
