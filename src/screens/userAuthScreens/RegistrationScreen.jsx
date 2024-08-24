import { View, Text, SafeAreaView, ScrollView, Image} from 'react-native'
import React from 'react'
import styles from '../../styles/screenStyles/userAuthStyles/RegistrationScreenStyles'
import {useForm} from "react-hook-form"
import CustomInput from '../../components/CustomInput'
import RedButton from '../../components/RedButton'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../components/RegistrationValidation'
import { useNavigation } from '@react-navigation/native'

import app from '../../components/firebase'
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'

import { getFirestore, doc, setDoc} from 'firebase/firestore'

import "firebase/firestore";

const RegistrationScreen = () => {
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

    const { firstName, lastName, phoneNumber, email, password } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'Ardana', user.uid), {
        firstName,
        lastName,
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

        <CustomInput
          control={control}
          name={'id'}
          placeholder={'ID number'}
          nameDisplay={'ID Number      '}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'firstName'}
          placeholder={'FirstName'}
          iconName={"person"}
          nameDisplay={'First Name    '}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'lastName'}
          placeholder={'LastName'}
          iconName={"person"}
          nameDisplay={'Last Name      '}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'phoneNumber'}
          placeholder={'PhoneNumber'}
          iconName={"phone"}
          nameDisplay={'Phone Number  '}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'email'}
          placeholder={'ValidEmail'}
          iconName={"email"}
          nameDisplay={'Valid Email     '}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'password'}
          placeholder={'Password'}
          iconName={"lock"}
          nameDisplay={'Password         '}
          errors={errors}
          />

<CustomInput
          control={control}
          name={'confirmPassword'}
          placeholder={'ConfirmPassword'}
          iconName={"lock"}
          nameDisplay={'Confirm Password'}
          errors={errors}
          />

        <RedButton text={'Register'} onPress={handleSubmit(submit)}/>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default RegistrationScreen;