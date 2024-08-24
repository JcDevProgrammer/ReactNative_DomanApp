import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from '../../styles/screenStyles/userAuthStyles/RegistrationDonatorStyles'
import {useForm} from "react-hook-form"
import CustomInput from '../../components/CustomInput'
import RedButton from '../../components/RedButton'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../components/RegistrationValidationDonator'
import { useNavigation } from '@react-navigation/native'

import app from '../../components/firebase'
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'

import { getFirestore, doc, setDoc} from 'firebase/firestore'

import "firebase/firestore";

const RegistrationDonatorScreen = () => {
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
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      resolver: yupResolver(schema)
    }
  )

  const submit = async (data) => {

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

      navigation.push('VerifyEmail')
      console.log('User signed up and data stored in Firestore!');

      await sendEmailVerification(user);

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };



  
  return (
    <SafeAreaView>
      <ScrollView>

        <View style = {styles.container}>

            <BackButton/>

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
          placeholder={'ConfirmPassword'}
          iconName={"lock"}
          nameDisplay={"Confirm Password"}
          errors={errors}
          />

        <RedButton text={'Register'} onPress={handleSubmit(submit)}/>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const BackButton = () => {

    const navigation = useNavigation();
  
    return(
      <View style = {styles.backButtonContainer}>
  
          <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image
                source={require('./../../assets/images/BackIcon.jpg')}
                style = {styles.image}
            />
          </TouchableOpacity>
            
      
      </View>
  
    )
  }

export default RegistrationDonatorScreen;