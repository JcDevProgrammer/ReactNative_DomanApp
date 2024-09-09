import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { collection, getDocs, getFirestore, doc, deleteDoc } from 'firebase/firestore';
import app from './../../../components/firebase';
import RedButton from './../../../components/RedButton';
import styles from './../../../styles/screenStyles/adminStyles/AdminDonationApprovStyles';

const db = getFirestore(app);

const BodyDonationApprov = () => {
  const [donation, setDonation] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const donatorSnapshot = await getDocs(collection(db, 'Donator'));

      let donationList = [];
      for (const donatorDoc of donatorSnapshot.docs) {
        const donatorId = donatorDoc.id;
        const donationPendingSnapshot = await getDocs(
          collection(db, 'Donator', donatorId, 'donationPending')
        );

        const donationDocuments = donationPendingSnapshot.docs.map(doc => ({
          id: doc.id,
          donatorId,
          collectionName: 'donationPending',
          ...doc.data(),
        }));

        donationList = [...donationList, ...donationDocuments];
      }

      setDonation(donationList);
    } catch (error) {
      console.error('Error fetching documents: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, donatorId, collectionName) => {
    try {
      const docRef = doc(db, 'Donator', donatorId, collectionName, id);
      await deleteDoc(docRef);
      console.log(`Deleted document with ID: ${id} in collection: Donator/${donatorId}/${collectionName}`);

      // Update the UI by removing the deleted item from the state
      setDonation(prevDonation => prevDonation.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.rowContainer}> {/* Row for each donation */}
 
        <Text style={styles.cell}>{item.type ? item.type : 'N/A'}</Text>
        <Text style={styles.cell}>{item.selectedValue ? item.selectedValue : 'N/A'}</Text>
        <Text style={styles.cell}>{item.quantity ? item.quantity : 'N/A'}</Text>
        <Text style={styles.cell}>{item.timeString ? item.timeString : 'N/A'}</Text>
        <Text style={styles.cell}>{item.receivedDate ? item.receivedDate : 'N/A'}</Text>
        <Text style={styles.cell}>{item.expiredDate ? item.expiredDate : 'N/A'}</Text>
        <Text style={styles.cell}>{item.description ? item.description : 'N/A'}</Text>
 
        {/* Ensure button is in a View */}
        <View style={styles.buttonCell}>
          <RedButton
            text="Delete"
            onPress={() => handleDelete(item.id, item.donatorId, item.collectionName)}
          />
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerCell}>Type</Text>
        <Text style={styles.headerCell}>Category</Text>
        <Text style={styles.headerCell}>Quantity</Text>
        <Text style={styles.headerCell}>Time</Text>
        <Text style={styles.headerCell}>Date Received</Text>
        <Text style={styles.headerCell}>Date Expired</Text>
        <Text style={styles.headerCell}>Description</Text>
        <Text style={styles.headerCell}>Action</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        data={donation}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }} // Add padding to avoid cutoff
      />
    
   
    </View>
  );
};

export default BodyDonationApprov;
