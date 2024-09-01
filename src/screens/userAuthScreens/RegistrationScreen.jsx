import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import styles from '../../styles/screenStyles/userAuthStyles/RegistrationScreenStyles';
import { useForm } from "react-hook-form";
import CustomInput from '../../components/CustomInput';
import RedButton from '../../components/RedButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../components/RegistrationValidation';
import { useNavigation } from '@react-navigation/native';
import CustomModal from './../../components/CustomModal'; 

import app from '../../components/firebase';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    resolver: yupResolver(schema)
  });

  const closeModal = () => {
    setModalVisible(false);
  };

  const submit = async (data) => {
    setIsLoading(true); // Start loading
  
    const auth = getAuth(app);
    const db = getFirestore(app);
  
    const { id, firstName, lastName, phoneNumber, email, password } = data;
  
    try {
      // Check if the ID matches a document with the corresponding employeeId in Firestore
      const q = query(collection(db, 'EmployeeId'), where('EmployeeId', '==', id));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Check if a user with the same employeeId already exists in the Ardana collection
        const existingUserQuery = query(collection(db, 'Ardana'), where('employeeId', '==', id));
        const existingUserSnapshot = await getDocs(existingUserQuery);
  
        if (!existingUserSnapshot.empty) {
          throw new Error('A user with this employee ID already exists.');
        }
  
        // If no existing user with the same employeeId, proceed with registration
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Save user data to Firestore
        await setDoc(doc(db, 'Ardana', user.uid), {
          firstName,
          lastName,
          phoneNumber,
          email,
          employeeId: id, // Store the employeeId
        });
  
        // Send email verification
        await sendEmailVerification(user);
  
        console.log('User signed up and data stored in Firestore!');
        setIsLoading(false); // Stop loading
        navigation.push('VerifyEmail'); // Navigate to email verification screen
      } else {
        throw new Error('Invalid employee ID.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setModalMessage(`Error signing up: ${error.message}`);
      setModalVisible(true);
      setIsLoading(false); // Stop loading
    }
  };
  
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Loading, please wait...</Text>
            </View>
          ) : (
            <>
              <CustomInput
                control={control}
                name={'id'}
                placeholder={'ID Number'}
                nameDisplay={'ID Number'}
                errors={errors}
              />

              <CustomInput
                control={control}
                name={'firstName'}
                placeholder={'First Name'}
                iconName={"person"}
                nameDisplay={'First Name'}
                errors={errors}
              />

              <CustomInput
                control={control}
                name={'lastName'}
                placeholder={'Last Name'}
                iconName={"person"}
                nameDisplay={'Last Name'}
                errors={errors}
              />

              <CustomInput
                control={control}
                name={'phoneNumber'}
                placeholder={'Phone Number'}
                iconName={"phone"}
                nameDisplay={'Phone Number'}
                errors={errors}
              />

              <CustomInput
                control={control}
                name={'email'}
                placeholder={'Email'}
                iconName={"email"}
                nameDisplay={'Email'}
                errors={errors}
              />

              <CustomInput
                control={control}
                name={'password'}
                placeholder={'Password'}
                iconName={"lock"}
                nameDisplay={'Password'}
                secureTextEntry
                errors={errors}
              />

              <CustomInput
                control={control}
                name={'confirmPassword'}
                placeholder={'Confirm Password'}
                iconName={"lock"}
                nameDisplay={'Confirm Password'}
                secureTextEntry
                errors={errors}
              />

              <RedButton text={'Register'} onPress={handleSubmit(submit)} />
            </>
          )}

          <CustomModal
            isVisible={isModalVisible}
            onClose={closeModal}
            message={modalMessage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegistrationScreen;
