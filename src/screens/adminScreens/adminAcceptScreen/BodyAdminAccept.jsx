import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs, getFirestore, doc, deleteDoc, documentId } from 'firebase/firestore';
import { getAuth, deleteUser } from 'firebase/auth'; // Import Firebase Authentication functions
import app from './../../../components/firebase';
import RedButton from '@/src/components/RedButton';
import { getFunctions, httpsCallable } from 'firebase/functions';


const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

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
  
      const deleteUserAndDocument = httpsCallable(functions, 'deleteUserAndDocument');
      const result = await deleteUserAndDocument({ docId, collectionName });
  
      if (result.data.success) {
        console.log(`User and document with ID ${docId} successfully deleted!`);
        fetchData(); // Refresh the data after deletion
      } else {
        console.error('Failed to delete user or document');
      }
    } catch (error) {
      console.error('Error removing document or user:', error);
    }
  };
  
  
  const renderItem = ({ item }) => (
  <View style={styles.containerAll}>
    <View style={styles.item}>
      {Object.keys(item).filter(key => key !== 'id' && key !== 'collectionName').map((key) => (
        <Text key={key} style={styles.field}>
          {key}: {JSON.stringify(item[key])}
        </Text>
      ))}
      </View>
      <View style={styles.containerButton}>
      <RedButton
        text="Delete"
        onPress={() => handleDelete(item.id, item.collectionName)}
      />
      </View>
  </View>

  );

  return (
    <View style= {styles.containerAllReturn}>
    <View style={styles.container}>
      <Text style={styles.title}>Ardana Documents</Text>
      <FlatList
        data={ardanaData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
     </View>
     <View style={styles.container}>
      <Text style={styles.title}>Donator Documents</Text>
      <FlatList
        data={donatorData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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