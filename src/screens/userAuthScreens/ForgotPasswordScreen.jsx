import { View, Text, Image, Alert} from 'react-native'
import React from 'react'
import styles from '../../styles/screenStyles/userAuthStyles/ForgotPasswordStyles'
import { useForm } from 'react-hook-form'
import CustomInput from '../../components/CustomInput'
import RedButton from '../../components/RedButton'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../components/EmailValidation'
import { useNavigation } from '@react-navigation/native';
import {getAuth, sendPasswordResetEmail } from 'firebase/auth'

import app from '@/src/components/firebase'

const ForgotPasswordScreen = () => {
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
      },
      resolver: yupResolver(schema)
    }
  )

    const    resetPassword =  async (data) => {
      const auth = getAuth(app);
      

      try {
        await sendPasswordResetEmail(auth, data.email);
        console.log("Success: Password reset email sent");
        navigation.navigate('ForgotChangePass',{ formData: data })
      } catch (error) {
        console.log("Failed: ", error.message);
      }
    }
  
    
  return (
    <View style={styles.container}>

      <EmailImage/>

      <Text>Enter your Email Address</Text>

      <CustomInput
          control={control}
          name={'email'}
          placeholder={'Email'}
          iconName={"email"}
          errors={errors}
          />


      
      <Text>Use Mobile Number</Text>

      <RedButton text = {'Confirm'} onPress={handleSubmit(resetPassword)}/>

      <RedButton
      onPress={() => navigation.goBack()}
      text = {'Cancel'}/>

    </View>
  )
}

const EmailImage = () => {
  return (
    <Image 
    source={require('./../../assets/images/EmailImage.jpg')}
    style = {styles.image}
    />
  )
}


export default ForgotPasswordScreen;