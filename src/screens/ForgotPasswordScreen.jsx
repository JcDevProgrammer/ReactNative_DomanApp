import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './../styles/screenStyles/ForgotPasswordStyles'
import { useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput'
import RedButton from '../components/RedButton'
import { yupResolver } from '@hookform/resolvers/yup'
import {schema} from "./../components/CustomInputValidation"


const ForgotPasswordScreen = () => {

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

  console.log(errors);

  const submit = (data) =>{
    console.log(data);
    Alert.alert(JSON.stringify(data));
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

      <RedButton text = {'Confirm'} onPress={handleSubmit(submit)}/>

      <RedButton text = {'Cancel'}/>


    </View>
  )
}

const EmailImage = () => {
  return (
    <Image 
    source={require('./../assets/images/EmailImage.jpg')}
    style = {styles.image}
    />
  )
}


export default ForgotPasswordScreen