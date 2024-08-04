import { View, Text, SafeAreaView, Image, StyleSheet} from 'react-native'
import React from 'react'
import {Link} from "expo-router"
import styles from './../src/styles/appStyles/DomanRegistrationStyles'

import RegistrationScreen from '../src/screens/RegistrationScreen'

const DomanRegistration = () => {
  return (
    <SafeAreaView >

      <BackButton/>
      
      <RegistrationScreen/>
      
    </SafeAreaView>
  )
}

const BackButton = () => {
  return(
    <View style = {styles.container}>

      <Link href={'DomanLogIn'}>
        <View >
          <Image
              source={require('./../src/assets/images/BackIcon.jpg')}
              style = {styles.image}
          />
        </View>
      </Link>
    </View>

  )
}



export default DomanRegistration