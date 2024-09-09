import { View, Text, SafeAreaView, TextInput, Button, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import styles from './../../../styles/screenStyles/donatorStyles/DonatorDonateStyles';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import RedButton from '@/src/components/RedButton';
import MyDatePicker from '../../../components/MyDatePicker';
import CustomModal from './../../../components/CustomModal';

import app from './../../../components/firebase';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';

// Utility function to format date as MM/DD/YYYY
const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return ''; // Return an empty string for invalid dates
  }
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// Function to validate if a date is in the correct format
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date.getTime());
};

const BodyDonatorDonate = () => {
  const [food, setFood] = useState(false);
  const [medicine, setMedicine] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [pickerOptions, setPickerOptions] = useState([]);

  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const [receivedDate, setReceivedDate] = useState(new Date());
  const [expiredDate, setExpiredDate] = useState(new Date());
  const [originalExpiredDate] = useState(new Date());

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if (food) {
      setPickerOptions([
        { label: 'Canned Goods', value: 'cannedGoods' },
        { label: 'Vegetables', value: 'vegetables' },
        { label: 'Drinks', value: 'drinks' },
      ]);
      setMedicine(false);
    } else if (medicine) {
      setPickerOptions([
        { label: 'Painkillers', value: 'painkillers' },
        { label: 'Antibiotics', value: 'antibiotics' },
        { label: 'Vitamins', value: 'vitamins' },
      ]);
      setFood(false);
    } else {
      setPickerOptions([]);
    }
    setSelectedValue(""); // Reset selected value when category changes
  }, [food, medicine]);

  const handleQuantityChange = (text) => {
    if (/^\d*$/.test(text)) {
      setQuantity(text);
    }
  };


  const submit = async () => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    
    // Get the current authenticated user
    const user = auth.currentUser;
  
  
    // Check if user is authenticated
    if (!user) {
      console.error('User is not authenticated.');
      setErrorMessage('You must be logged in to submit a donation.');
      setModalVisible(true);
      return;
    }
  
    try {
      // Validate all required fields
      if (!food && !medicine) {
        console.log('Food or Medicine');
        setErrorMessage('Food or Medicine');
        setModalVisible(true);
        return;
      }
      if (!selectedValue) {
        console.log('Please select a category.');
        setErrorMessage('Please select a category.');
        setModalVisible(true);
        return;
      }
      if (!quantity) {
        console.log('Error: Quantity is required.');
        setErrorMessage('Quantity is required');
        setModalVisible(true);
        return;
      }
      if (!isValidDate(receivedDate)) {
        console.log('Error: Invalid Date Received.');
        setErrorMessage('Invalid Date Received');
        setModalVisible(true);
        return;
      }
      if (!isValidDate(expiredDate)) {
        console.log('Error: Invalid Date Expired.');
        setErrorMessage('Invalid Date Expired');
        setModalVisible(true);
        return;
      }
      if (!description) {
        console.log('Error: Description is required.');
        setErrorMessage('Description is required');
        setModalVisible(true);
        return;
      }
    
      if (expiredDate.getTime() === originalExpiredDate.getTime()) {
        console.log('Please change the expired date');
        setErrorMessage('Please change the expired date');
        setModalVisible(true);
        return;
      }
    
      // Determine the type (Food or Medicine)
      const type = food ? 'Food' : medicine ? 'Medicine' : 'None';
      
      const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0]; // Example: 20240905_123456
      // Store the document in Firestore
      const donationId = `donation_${timestamp}`; // Generate a unique ID
      const donationRef = doc(db, 'Donator', user.uid, 'donationPending', donationId);

      const now = new Date(); // Current time for saving to Firestore
      const timeString = now.toTimeString().split(' ')[0]; // Example: 12:34:56

      // Store the document in Firestore
      await setDoc(donationRef, {
      // Store the document in Firestore
        type,
        selectedValue,
        quantity,
        receivedDate: formatDate(receivedDate),
        expiredDate: formatDate(expiredDate),
        description,
        timeString, // Save the time in HH:MM:SS format
      });
    
      console.log('Type:', type);
      console.log('Category:', selectedValue);
      console.log('Quantity:', quantity);
      console.log('Date Received:', formatDate(receivedDate)); 
      console.log('Date Expired:', formatDate(expiredDate)); 
      console.log('Description:', description);
      console.log('Time:', timeString);
    
    } catch (error) {
      console.error('Error submitting donation:', error);
      setErrorMessage('Error submitting donation. Please try again.');
      setModalVisible(true);
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerFoodMedicine}>
        <Checkbox
          style={styles.checkbox}
          value={food}
          onValueChange={setFood}
          color={food ? '#4630EB' : undefined}
        />
        <Text style={styles.textFood}>Food</Text>
    
        <Checkbox
          style={styles.checkbox}
          value={medicine}
          onValueChange={setMedicine}
          color={medicine ? '#4630EB' : undefined}
        />
        <Text style={styles.textMedicine}>Medicine</Text>
      </View>
    
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Select a category..." value="" />
          {pickerOptions.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      <View style={styles.containerQuantity}>
        <Text style={styles.quantityLabel}>Quantity : </Text>
        <TextInput
          style={styles.quantity}
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="numeric"
          placeholder=" Enter"
        />
      </View>
      
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={errorMessage}
      />

      <View style={styles.containerDate}>
        <Text style={styles.textDate}>Date Received: </Text>
        <MyDatePicker date={receivedDate} setDate={setReceivedDate} />
      </View>

      <View style={styles.containerDate}>
        <Text style={styles.textDate}>Date Expired:  </Text>
        <MyDatePicker date={expiredDate} setDate={setExpiredDate} />
      </View>
      
      <View style={styles.containerDescription}>
        <Text style={styles.descriptionLabel}>Description:</Text>
        <TextInput
          style={styles.description}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline={true}
          numberOfLines={8}
        />
        <RedButton text={'Submit'} onPress={submit} />

      </View>
    </SafeAreaView>
  );
}

export default BodyDonatorDonate;
