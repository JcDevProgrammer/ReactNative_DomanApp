import { View, Text, Image, SafeAreaView, TextInput, ScrollView, Alert} from 'react-native'
import React from 'react'
import styles from '../../styles/screenStyles/userAuthStyles/LogInScreenStyles'
import RedButton from '../../components/RedButton'
import CustomInput from '../../components/CustomInput'
import {useForm, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native';

import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { getFirestore, collection, getDoc, doc} from 'firebase/firestore'

import app from '../../components/firebase'

const LogInScreen = () => {
  

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
    
    }
  )
  const navigation = useNavigation();


  const LogIn = async (data) =>{
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
      } else if  (adminDoc.exists()){
        console.log("User found in Firestore Admin:", adminDoc.data());
        navigation.navigate('admin', { userData: adminDoc.data() });
      } else if (donatorDoc.exists()){
        console.log("User found in Firestore Donator:", donatorDoc.data());
        navigation.navigate('donator', { userData: donatorDoc.data() });
      }
    }  

  } catch (error) {
    console.error("Error logging in and checking Firestore:", error.message);
    // Handle the error (e.g., show an alert to the user)
  }
};
 

  return (
    <SafeAreaView >
      <ScrollView>

        <View style= {styles.container}>

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


export default LogInScreen;