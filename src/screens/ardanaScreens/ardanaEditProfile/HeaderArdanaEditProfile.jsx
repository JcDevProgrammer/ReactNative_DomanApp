import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import styles from './../../../styles/screenStyles/adminStyles/AdminEditProfileStyles'


const HeaderArdanaEditProfile = () => {

  return(

    <View style = {styles.headerContainer}> 

      <BackButton/>
      
      <View style = {styles.headerTextView}>
        <Text style ={styles.headerText}>Volunteer</Text>
        <Text style ={styles.headerText}>Edit Profile</Text>
      </View>         
    
    </View>

  )
}

const BackButton = () => {
  const navigation = useNavigation();
  return(
    <View style = {styles.headerImageView}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Image
              source={require('./../../../assets/images/BackIcon.jpg')}
              style = {styles.headerImage}
          />
        </TouchableOpacity>
      </View>
  )
}

export default HeaderArdanaEditProfile