import { View, Text, SafeAreaView, ScrollView, Image, Alert} from 'react-native'
import React from 'react'
import styles from '../../styles/screenStyles/userAuthStyles/RegistrationScreenStyles'
import {useForm} from "react-hook-form"
import CustomInput from '../../components/CustomInput'
import RedButton from '../../components/RedButton'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../components/InputRegistrationValidation'

import app from '../../components/firebase'
import {getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import { getFirestore, doc, setDoc} from 'firebase/firestore'

import "firebase/firestore";

const RegistrationScreen = () => {

  const {
    control,
    handleSubmit,
    formState: {
    errors
    }
  } = useForm(
    {
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
    }
  )

  const submit = async (data) => {

    const auth = getAuth(app);
    const db = getFirestore(app);

    const { firstName, phoneNumber, email, password } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        phoneNumber,
        email,
      });

      console.log('User signed up and data stored in Firestore!');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };



  
  return (
    <SafeAreaView>
      <ScrollView>

        <View style = {styles.container}>

        <CustomInput
          control={control}
          name={'id'}
          placeholder={'ID number      '}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'firstName'}
          placeholder={'FirstName      '}
          iconName={"person"}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'lastName'}
          placeholder={'LastName        '}
          iconName={"person"}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'phoneNumber'}
          placeholder={'PhoneNumber   '}
          iconName={"phone"}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'email'}
          placeholder={'ValidEmail         '}
          iconName={"email"}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'password'}
          placeholder={'Password          '}
          iconName={"lock"}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'confirmPassword'}
          placeholder={'ConfirmPassword'}
          iconName={"lock"}
          errors={errors}
          />


        <RedButton text={'Register'} onPress={handleSubmit(submit)}/>

        

        </View>

       

      </ScrollView>
    </SafeAreaView>
  )
}

export default RegistrationScreen;