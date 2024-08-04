import { View, Text, SafeAreaView, ScrollView, Image} from 'react-native'
import React from 'react'
import styles from './../styles/screenStyles/RegistrationScreenStyles'
import {useForm, Controller} from "react-hook-form"
import CustomInput from '../components/CustomInput'
import RedButton from '../components/RedButton'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema }from "./../components/CustomInputValidation"

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

  console.log(errors);

  const submit = (data) =>{
    console.log(data);
    Alert.alert(JSON.stringify(data));
  }

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