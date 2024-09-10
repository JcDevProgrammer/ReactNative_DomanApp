import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { collection, getDocs, getFirestore, doc, deleteDoc, setDoc } from 'firebase/firestore';
import app from './../../../components/firebase';
import RedButton from './../../../components/RedButton';
import SmallButton from './../../../components/SmallButton';
import styles from './../../../styles/screenStyles/adminStyles/AdminDonationApprovStyles';
import CustomModal from './../../../components/CustomModal';

const db = getFirestore(app);

const BodyDonationApprov = () => {
  const [donation, setDonation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAcceptVisible, setAcceptVisible] = useState(false);
  const [isDeleteVisible, setDeleteVisible] = useState(false);

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

      setDonation(prevDonation => prevDonation.filter(item => item.id !== id));
      setDeleteVisible(true);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleAccept = async (id, donatorId, collectionName, item) => {
    try {
      console.log('Item Type:', item.type); // Debugging line
  
      const targetCollection = item.type === 'Food' ? 'FoodList' : item.type === 'Medicine' ? 'MedicineList' : 'UnknownType';
  
      if (targetCollection === 'UnknownType') {
        console.error(`Unhandled donation type: ${item.type}`);
        return;
      }
  
      await setDoc(doc(db, targetCollection, id), {
        ...item,
        donatorId,
        timestamp: new Date()
      });
  
      const donationId = `donation_${Date.now()}`; // Using Date.now() for simplicity
  
      await setDoc(doc(db, 'Donator', donatorId, 'donationAccepted', donationId), {
        ...item,
        donatorId,
        timestamp: new Date()
      });
  
      const docRef = doc(db, 'Donator', donatorId, collectionName, id);
      await deleteDoc(docRef);
      console.log(`Deleted document with ID: ${id} in collection: Donator/${donatorId}/${collectionName}`);
  
      setDonation(prevDonation => prevDonation.filter(donationItem => donationItem.id !== id));
      setAcceptVisible(true);
    } catch (error) {
      console.error('Error handling donation acceptance: ', error);
    }
  };
  

  const renderItem = ({ item }) => (
    <SafeAreaView style={styles.rowContainer}>
      <Text style={styles.cell}>{item.type || 'N/A'}</Text>
      <Text style={styles.cell}>{item.selectedValue || 'N/A'}</Text>
      <Text style={styles.quantityCell}>{item.quantity || 'N/A'}</Text>
      <Text style={styles.cell}>{item.timeString || 'N/A'}</Text>
      <Text style={styles.cell}>{item.receivedDate || 'N/A'}</Text>
      <Text style={styles.cell}>{item.expiredDate || 'N/A'}</Text>
      <Text style={styles.descriptionCell}>{item.description || 'N/A'}</Text>
      <View style={styles.buttonCell}>
        <View style={styles.acceptDelete}>
          <SmallButton
            text="Accept"
            onPress={() => handleAccept(item.id, item.donatorId, item.collectionName, item)}
            color='green'
          />
          <SmallButton
            text="Delete"
            onPress={() => handleDelete(item.id, item.donatorId, item.collectionName)}
            color='red'
          />
        </View>
        <SmallButton
          text="Donor"
          onPress={() => handleDelete(item.id, item.donatorId, item.collectionName)}
          color='blue'
        />
      </View>
    </SafeAreaView>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleCloseAcceptModal = () => {
    setAcceptVisible(false);           
  };

  const handleCloseDeleteModal = () => {
    setDeleteVisible(false);           
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <View style={styles.tableContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerCell}>Type</Text>
            <Text style={styles.headerCell}>Category</Text>
            <Text style={styles.quantityHeader}>Qty</Text>
            <Text style={styles.headerCell}>Time</Text>
            <Text style={styles.headerCell}>Date Received</Text>
            <Text style={styles.headerCell}>Date Expired</Text>
            <Text style={styles.descriptionHeader}>Description</Text>
            <Text style={styles.headerCell}>Action</Text>
          </View>
          <CustomModal isVisible={isAcceptVisible} onClose={handleCloseAcceptModal} message="Accepted" />
          <CustomModal isVisible={isDeleteVisible} onClose={handleCloseDeleteModal} message="Deleted" />
          <FlatList
            data={donation}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BodyDonationApprov;
