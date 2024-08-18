import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './../../styles/screenStyles/userAuthStyles/VerifyEmailStyles'
import { useNavigation } from '@react-navigation/native'
import {getAuth, sendEmailVerification } from 'firebase/auth'
import app from '../../components/firebase'

import { useState } from'react';
import CustomModal from'./../../components/CustomModal'; 

const VerifyEmailScreen = () => {

  const [isModalResent, setResentModal] = useState(false);
  const Resent = () => {
    setResentModal(false);           
  };  

  const [isModalFailed, setFailedModal] = useState(false);
  const Failed = () => {
    setFailedModal(false);           
  };  

  const [isModalNoUser, setNoUser] = useState(false);
  const NoUser = () => {
    setNoUser(false);           
  };

  async function ResendVerificationEmail() {
    const auth = getAuth(app);
    const user = auth.currentUser; // Get the currently signed-in user
  
    if (user) {
      try {
        // Resend the email verification
        await sendEmailVerification(user);
        console.log('Verification email resent!');
        setResentModal(true); 

      } catch (error) {
        console.error('Error resending verification email:', error.message);
        setFailedModal(true);
      }

    } else {
      console.log('No user is currently signed in.');
       setNoUser(true);
    }
  }


  return (
    <SafeAreaView style = {styles.container}>
      <Text style={styles.textRegistered}>Registered Successfully</Text>

      <View style = {styles.textContainer}>
      <Text style = {styles.text}>Before LogIn please</Text>
      <Text style = {styles.text}>verify your Email in</Text>
      <Text style = {styles.text}>your email account</Text>
      </View>

      <Text>Didn't get the Email verification</Text>

      <CustomModal isVisible={isModalResent}          
        onClose={Resent}
        message="Verification Resent"
      /> 
      <CustomModal isVisible={isModalFailed}          
      onClose={Failed}
      message="Verification failed"
      /> 
      <CustomModal isVisible={isModalNoUser}          
      onClose={NoUser}
      message="Verification no user"
      /> 

      <Text style = {styles.textResend}
      onPress={(ResendVerificationEmail)
      }
      >Resend</Text>

      <ClickSignIn/>  

    </SafeAreaView>
  )
}

const ClickSignIn = () =>{
  const navigation = useNavigation();

    return(
      <View style={styles.containerSignIn}>
        <Text 
        style={styles.textSignIn}
        onPress={()=> navigation.navigate('LogIn')}>Click here to Log In
        </Text>
      </View>
    )
}


export default VerifyEmailScreen;