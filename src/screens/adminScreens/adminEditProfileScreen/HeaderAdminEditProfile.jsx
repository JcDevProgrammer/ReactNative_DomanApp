import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import styles from '../../../styles/appStyles/HeaderProfileStyles'


const HeaderProfileScreen = () => {

  return(

    <View style = {styles.container}> 

      <BackButton/>
      
      <View style = {styles.textView}>
        <Text style ={styles.text}>Edit Profile</Text>
      </View>         
    
    </View>

  )
}

const BackButton = () => {
  const navigation = useNavigation();
  return(
    <View style = {styles.imageView}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Image
              source={require('./../../../assets/images/BackIcon.jpg')}
              style = {styles.image}
          />
        </TouchableOpacity>
      </View>
  )
}

export default HeaderProfileScreen