import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import styles from '../../styles/screenStyles/userAuthStyles/RegistrationDonatorStyles';
import { useForm } from "react-hook-form";
import CustomInput from '../../components/CustomInput';
import RedButton from '../../components/RedButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../components/RegistrationValidationDonator';
import { useNavigation } from '@react-navigation/native';
import CustomModal from './../../components/CustomModal';

import app from '../../components/firebase';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const RegistrationDonatorScreen = () => {
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
      name: "",
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

    const { name, phoneNumber, email, password } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'Donator', user.uid), {
        name,
        phoneNumber,
        email,
      });

      console.log('User signed up and data stored in Firestore!');
      await sendEmailVerification(user);

      setIsLoading(false); // Stop loading
      navigation.push('VerifyEmail');
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
          <BackButton />

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Loading please wait...</Text>
            </View>
          ) : (
            <>
              <CustomInput
                control={control}
                name={'name'}
                placeholder={'Full name or Company name'}
                iconName={"person"}
                nameDisplay={"Account Name"}
                errors={errors}
              />

              <CustomInput
                control={control}
                name={'phoneNumber'}
                placeholder={'Phone Number'}
                iconName={"phone"}
                nameDisplay={"Phone Number"}
                errors={errors}
              />

              <CustomInput
                control={control}
                name={'email'}
                placeholder={'Valid Email'}
                iconName={"email"}
                nameDisplay={"Valid Email      "}
                errors={errors}
              />

              <CustomInput
                control={control}
                name={'password'}
                placeholder={'Password'}
                iconName={"lock"}
                nameDisplay={"Password           "}
                errors={errors}
              />

              <CustomInput
                control={control}
                name={'confirmPassword'}
                placeholder={'Confirm Password'}
                iconName={"lock"}
                nameDisplay={"Confirm Password"}
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
};

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.backButtonContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('./../../assets/images/BackIcon.jpg')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationDonatorScreen;
