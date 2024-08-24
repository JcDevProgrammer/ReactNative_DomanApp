import { View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from './../../styles/screenStyles/userAuthStyles/ForgotChangePassStyles'
import { useNavigation, useRoute } from '@react-navigation/native'
import RedButton from '@/src/components/RedButton'

import { useState } from'react';
import CustomModal from'./../../components/CustomModal'; 

import {getAuth, sendPasswordResetEmail } from 'firebase/auth'
import app from './../../components/firebase'

const ForgotChangePassScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { formData } = route.params;

  const Done = () => {
    return (
      navigation.navigate('LogIn')
    )
  }

  const [isModalResend, setModalResend] = useState(false);
  const Resend = () => {
    setModalResend(false);         
  };

  const [isModalFailed, setModalFailed] = useState(false);
  const Failed = () => {
    setModalFailed(false);          
  };

  const [isModalNoUser, setModalNoUser] = useState(false);
  const NoUser = () => {
    setModalNoUser(false);          
  };

  async function ResendPasswordResetEmail() {
    const auth = getAuth(app);
   

    if (formData && formData.email) {
      try {
        await sendPasswordResetEmail(auth, formData.email);
        console.log('Email sent reset password!');
        setModalResend(true); 

      } catch (error) {
        console.error('Error resending reset password:', error.message);
        setModalFailed(true);
      } 
    } else {
      console.log('No email address');
      setModalNoUser(true);
    }
  }

  return (
    <SafeAreaView style ={styles.Container}>
      
      <BackButton/>

      <View style = {styles.textContainer}>
        <Text style ={styles.text}>Change your password</Text>
        <Text style ={styles.text}>in the link that sent</Text>
        <Text style ={styles.text}>into your email account</Text>
      </View>

      <View>
        <Text style={styles.textChange}>Didn't get the email?</Text>
      </View>

      <View>
      <Text style = {styles.textResend}
      onPress={(ResendPasswordResetEmail)
      }
      >Resend</Text>

      
      <CustomModal isVisible={isModalResend}          
      onClose={Resend}
      message="Email sent reset password!"
      />
      
      <CustomModal isVisible={isModalFailed}          
      onClose={Failed}
      message="Error resending reset passwod:"
      />

      <CustomModal isVisible={isModalNoUser}          
      onClose={NoUser}
      message="No Email Address"
      />

      </View>

      <RedButton 
      text={'Done'}
      onPress={(Done)}
      />
    </SafeAreaView>
  )
}

const BackButton = () => {
    const navigation = useNavigation();
    return (
        <View style = {styles.viewBackButton}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Image source={require('./../../assets/images/BackIcon.jpg')}
        style = {styles.backButton}
        />
        </TouchableOpacity>
      </View>
    )
}





export default ForgotChangePassScreen