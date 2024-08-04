import { View, SafeAreaView, Text} from 'react-native'
import React from 'react'
import {Link} from "expo-router"
import styles from './../src/styles/appStyles/DomanLogInStyles'

import LogInScreen from '../src/screens/LogInScreen'


const DomanLogIn = () => {
  return (
    <View >

      <View >
        <LogInScreen/>
      </View>

      <View >
         <LinkForgotPasswordRegistration/>
      </View>


    </View>
  );
};


const LinkForgotPasswordRegistration = () =>{
  return(
    <View style = {styles.container}>
        <Link href={'DomanForgotPassword'}>Forgot Password</Link>

        <Link 
        style = {styles.linkRegister}
        href={'DomanRegistration'}>Register</Link>
      </View>
  )
}



export default DomanLogIn

