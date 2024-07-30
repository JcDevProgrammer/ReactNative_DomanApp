import { View, Text, SafeAreaView, ScrollView, Image} from 'react-native'
import React from 'react'
import styles from './../styles/screenStyles/RegistrationScreenStyles'
import {useForm, Controller} from "react-hook-form"
import Inputs from './../components/Inputs'
import RedButton from '../components/RedButton'

const RegistrationScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>

        <View style = {styles.container}>

        <IDInput/>

        <FirstNameInput/>

        <LastNameInput/>

        <PhoneNumberInput/>

        <EmailInput/>

        <PasswordInput/>

        <ConfirmPasswordInput/>
        
        <RedButton text={'Register'}/>

        </View>

       

      </ScrollView>
    </SafeAreaView>
  )
}

const IDInput = () => {

  const { control, handleSubmit, formState: {errors}} = useForm()

  return(

    <View style = {styles.inputContainerPadding}>
      
      <Text>ID</Text>

      <View style = {styles.inputContainer}>
      
        <Image
          source={require('./../assets/images/IdIcon.png')}
          style= {styles.icons}
          />

        <Inputs  
          control={control} 
          name = {"ID"} 
          placeholder={"ID"} 
        />
      </View>
    </View>
  )
}

const FirstNameInput = () => {

  const { control, handleSubmit, formState: {errors}} = useForm()

  return(

    <View style = {styles.inputContainerPadding}>
      
      <Text>First Name</Text>

      <View style = {styles.inputContainer}>
      
        <Image
          source={require('./../assets/images/PersonIcon.png')}
          style= {styles.icons}
          />

        <Inputs  
          control={control} 
          name = {"FirstName"} 
          placeholder={"First Name"} 
        />
      </View>
    </View>
  )
}

const LastNameInput = () => {

  const { control, handleSubmit, formState: {errors}} = useForm()

  return(

    <View style = {styles.inputContainerPadding}>
      
      <Text>Last Name</Text>

      <View style = {styles.inputContainer}>
      
        <Image
          source={require('./../assets/images/PersonIcon.png')}
          style= {styles.icons}
          />

        <Inputs  
          control={control} 
          name = {"LastName"} 
          placeholder={"Last Name"} 
        />
      </View>
    </View>
  )
}

const PhoneNumberInput = () => {

  const { control, handleSubmit, formState: {errors}} = useForm()

  return(

    <View style = {styles.inputContainerPadding}>
      
      <Text>Phone Number</Text>

      <View style = {styles.inputContainer}>
      
        <Image
          source={require('./../assets/images/PhoneNumberIcon.png')}
          style= {styles.icons}
          />

        <Inputs  
          control={control} 
          name = {"PhoneNumber"} 
          placeholder={"Phone Number"} 
        />
      </View>
    </View>
  )
}

const EmailInput = () => {

  const { control, handleSubmit, formState: {errors}} = useForm()

  return(

    <View style = {styles.inputContainerPadding}>
      
      <Text>Email</Text>

      <View style = {styles.inputContainer}>
      
        <Image
          source={require('./../assets/images/EmailIcon.jpg')}
          style= {styles.icons}
          />

        <Inputs  
          control={control} 
          name = {"Email"} 
          placeholder={"Email"} 
        />
      </View>
    </View>
  )
}

const PasswordInput = () => {

  const { control, handleSubmit, formState: {errors}} = useForm()

  return(

    <View style = {styles.inputContainerPadding}>
      
      <Text>Password</Text>

      <View style = {styles.inputContainer}>
      
        <Image
          source={require('./../assets/images/PasswordIcon.jpg')}
          style= {styles.icons}
          />

        <Inputs  
          control={control} 
          name = {"Password"} 
          placeholder={"Password"} 
        />
      </View>
    </View>
  )
}

const ConfirmPasswordInput = () => {

  const { control, handleSubmit, formState: {errors}} = useForm()

  return(

    <View style = {styles.inputContainerPadding}>
      
      <Text>Confirm Password </Text>

      <View style = {styles.inputContainer}>
      
        <Image
          source={require('./../assets/images/PasswordIcon.jpg')}
          style= {styles.icons}
          />

        <Inputs  
          control={control} 
          name = {"ConfirmPassword"} 
          placeholder={"Confirm Password"} 
        />
      </View>
    </View>
  )
}

export default RegistrationScreen;