import { View, Text, Image, SafeAreaView, TextInput, ScrollView, Alert} from 'react-native'
import React from 'react'
import styles from './../styles/screenStyles/LogInScreenStyles'
import RedButton from './../components/RedButton'
import CustomInput from '../components/CustomInput'
import {useForm, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import {schema} from "./../components/CustomInputValidation"


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
        username: "",
        password: "",
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
    <SafeAreaView >
      <ScrollView>

        <View style= {styles.container}>

          <RedCrossImage/>
      
          <Text style = {styles.text}>QUEZON CITY-CHAPTER</Text>

          <CustomInput
          control={control}
          name={'username'}
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

          <RedButton text={'Log In'} onPress={handleSubmit(submit)}/>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const RedCrossImage = () => {
  return(
   <Image
        source={require('./../assets/images/RedCrossLogo.jpg')}
        style= {styles.image}
        />
  )
}


export default LogInScreen;