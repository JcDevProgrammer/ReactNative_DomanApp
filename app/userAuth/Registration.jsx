import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import styles from '../../src/styles/appStyles/DomanRegistrationStyles'
import { useNavigation } from '@react-navigation/native'

import RegistrationScreen from '../../src/screens/userAuthScreens/RegistrationScreen'


const Registration = () => {
  return (

      <ScrollView>
        <View>
          <BackButton/>
          
          <RegistrationScreen/>
        </View>
      </ScrollView>
  )
}

const BackButton = () => {

  const navigation = useNavigation();

  return(
    <View style = {styles.container}>

        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Image
              source={require('./../../src/assets/images/BackIcon.jpg')}
              style = {styles.image}
          />
        </TouchableOpacity>
          
    
    </View>

  )
}



export default Registration