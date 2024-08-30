import { View, Text, Image, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native'
import React from 'react'
import { useState } from 'react';
import styles from '../../styles/screenStyles/userAuthStyles/LogInScreenStyles'
import RedButton from '../../components/RedButton'
import CustomInput from '../../components/CustomInput'
import {useForm, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native';
import { schema } from '../../components/LogInValidation';
import CustomModal from './../../components/CustomModal'; 

import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { getFirestore, collection, getDoc, doc} from 'firebase/firestore'

import app from '../../components/firebase'

const LogInScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const {
    control,
    handleSubmit,
    formState: {
    errors
    }
  } = useForm(
    {
      defaultValues: {
        email: "",
        password: "",
      },
      resolver: yupResolver(schema)
    }
  )

  const closeModal = () => {
    setModalVisible(false);
  };


  const LogIn = async (data) =>{
    setIsLoading(true); // Start loading

  const auth = getAuth(app);
  const firestore = getFirestore(app);
 
  const {email, password} =data
  try {
    // Sign in the user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userId = user.uid;

    console.log("Email and password:", email, password);
    

    if (userId) {
      const ardanaRef = doc(firestore, 'Ardana', userId);
      const ardanaDoc = await getDoc(ardanaRef);

      const adminRef = doc(firestore, 'Admin', userId);
      const adminDoc = await getDoc(adminRef);

      const donatorRef = doc(firestore, 'Donator', userId);
      const donatorDoc = await getDoc(donatorRef);

      if (ardanaDoc.exists()) {
        console.log("User found in Firestore Ardana:", ardanaDoc.data());
        // Navigate to the 'ardana' screen with the user's data
        navigation.navigate('ardana', { userData: ardanaDoc.data() });
        setIsLoading(false); // Stop loading

      } else if  (adminDoc.exists()){
        console.log("User found in Firestore Admin:", adminDoc.data());
        navigation.navigate('admin', { userData: adminDoc.data() });
        setIsLoading(false); // Stop loading

      } else if (donatorDoc.exists()){
        console.log("User found in Firestore Donator:", donatorDoc.data());
        navigation.navigate('donator', { userData: donatorDoc.data() });
        setIsLoading(false); // Stop loading

      }
    }  

  } catch (error) {
    console.error("Error logging in and checking Firestore:", error.message);
    setModalMessage(`Error logging In: ${error.message}`);
    setModalVisible(true);
    setIsLoading(false); // Stop loading
  }
};
 

  return (
    <SafeAreaView >
      <ScrollView>

        <View style= {styles.container}>

        {isLoading ? (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Loading please wait...</Text>
          </View>
          ) : (
            <>

          <RedCrossImage/>
      
          <Text style = {styles.text}>QUEZON CITY-CHAPTER</Text>

          <CustomInput
          control={control}
          name={'email'}
          placeholder={'UserName'}
          iconName={"email"}
          errors={errors}
          />

         <CustomInput
          control={control}
          name={'password'}
          placeholder={'Password'}
          iconName={"lock"}
          secureTextEntry={true}
          errors={errors}
          />

          <RedButton text={'Log In'} onPress={handleSubmit(LogIn) }/>
          <CustomModal
            isVisible={isModalVisible}
            onClose={closeModal}
            message={modalMessage}
          />

        <View >
          <ForgotPasswordandRegistration/>
        </View>

        </>
        )}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const RedCrossImage = () => {
  return(
   <Image
        source={require('./../../assets/images/RedCrossLogo.jpg')}
        style= {styles.image}
        />
  )
}

const ForgotPasswordandRegistration = () =>{

  const navigation = useNavigation();

  return(

    <View style = {styles.textContainer}>

      <Text
      onPress={() => navigation.push('ForgotPassword')}>Forgot Password
      </Text>
        
      <Text 
      style = {styles.linkRegister} 
      onPress={() => navigation.push('RegistrationSelect')}>Register
      </Text>
      
    </View>
  )
}


export default LogInScreen;