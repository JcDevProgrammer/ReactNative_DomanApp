import { View, Text, Image, SafeAreaView, TextInput, ScrollView, Alert} from 'react-native'
import React from 'react'
import styles from '../../styles/screenStyles/userAuthStyles/LogInScreenStyles'
import RedButton from '../../components/RedButton'
import CustomInput from '../../components/CustomInput'
import {useForm, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import app from '../../components/firebase'

const LogInScreen = () => {
  const navigation = useNavigation();

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

  const LogIn = (data) =>{
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("login")
    navigation.navigate('admin')
        // ...
  })
   .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   });
  }

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