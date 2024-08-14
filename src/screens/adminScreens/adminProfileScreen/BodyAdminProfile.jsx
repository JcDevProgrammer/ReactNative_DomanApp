import {SafeAreaView, View, Text, Image} from 'react-native'
import React from 'react'
import styles from '../../../styles/screenStyles/adminStyles/AdminProfileStyles'
import RedButton from '../../../components/RedButton'
import MediumRedButton from '../../../components/MediumRedButton'
import { useNavigation } from '@react-navigation/native'

const AdminProfileScreen = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style ={styles.container}>

      <ProfileImage/>

      <Name/>

      <Email/>

      <Phone/>

      <Birthday/>

      <MediumRedButton 
      text= {'Edit Profile'}
      onPress={() => navigation.push('AdminEditProfile')}
      />

      <RedButton 
      text= {'Log Out'}  
      onPress={() => navigation.navigate('userAuth')}
      />
    </SafeAreaView>
  )
}

const ProfileImage = () => {
  return(
      <View style = {styles.profileImageContainer}>
        <Image 
        source={require('./../../../assets/images/ProfileIcon.png')}
        style= {styles.profileImage}
        />
      </View>
  )
}

const Name = () => {
  return(
    <View style={styles.textContainer}>
        <Text style ={styles.text}>Name:</Text>
        <Text>name</Text>
      </View>
  )
}

const Email = () => {
  return (
    <View style={styles.textContainer}>
         <Text style ={styles.text}>Email:</Text>
         <Text>email</Text>
      </View>
  )
}

const Phone = () =>{
  return (
    <View style={styles.textContainer}>
         <Text style ={styles.text}>Phone:</Text>
         <Text>phone</Text>
      </View>
  )
}

const Birthday = () =>{
  return (
    <View style={styles.textContainer}>
         <Text style ={styles.text}>Birthday:</Text>
         <Text>birthday</Text>
      </View>
  )
}



export default AdminProfileScreen