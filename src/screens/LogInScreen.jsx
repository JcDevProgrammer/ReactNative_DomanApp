import { View, Text, Image, SafeAreaView, TextInput, ScrollView} from 'react-native'
import React from 'react'
import styles from './../styles/screenStyles/LogInScreenStyles'
import RedButton from './../components/RedButton'
import Inputs from './../components/Inputs'
import {useForm, Controller} from "react-hook-form"


const LogInScreen = () => {

  return (
    <SafeAreaView >
      <ScrollView>

        <View style= {styles.container}>

          <RedCrossImage/>
      
          <Text style = {styles.text}>QUEZON CITY-CHAPTER</Text>
    
          <EmailInput/>

          <PasswordInput/>

          <RedButton text={'Log In'}/>

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

const EmailInput = () => {

  const {
    control,
    handleSubmit,
    formState: {
    errors
    }
  } = useForm()

  return(

    <View style = {styles.inputContainerPadding}>
      
      <Text>UserName</Text>

      <View style = {styles.inputContainer}>
      
        <Image
          source={require('./../assets/images/EmailIcon.jpg')}
          style= {styles.icons}
          />

        <Inputs  
          control={control} 
          name = {"username"} 
          placeholder={"UserName"} 
        />
      </View>
    </View>
  )
}

const PasswordInput = () => {

  const {
    control,
    handleSubmit,
    formState: {
    errors
    }
  } = useForm()

  return(
    <View>
      <Text>Password</Text>
      <View style = {styles.inputContainer}>
        <Image
          source={require('./../assets/images/PasswordIcon.jpg')}
          style= {styles.icons}
        />

        <Inputs  
          control={control} 
          name = {"password"} 
          placeholder={"Password"} 
        />
      </View>
    </View>
  )
}



export default LogInScreen;