import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './../../../styles/screenStyles/adminStyles/AdminMainStyles'
import { useNavigation } from '@react-navigation/native';

const HeaderAdminScreen = () => {

    const navigation = useNavigation();
    
    return(
        <View style = {styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.push('AdminAccept')}>
              <Image 
              source={require('./../../../assets/images/AcceptingVolunteer.jpg')}
              style= {styles.headerImage}
              />
            </TouchableOpacity>

          <View style = {styles.headerTextView}>
            <Text style = {styles.headerTextAdmin}>Admin</Text>
          </View>
          <View style = {styles.headerImageView}>
            <TouchableOpacity onPress={() => navigation.push('AdminProfile')}>
                <Image
                source={require('./../../../assets/images/ProfileIcon.png')}
                style = {styles.headerImage}
                />
            </TouchableOpacity>
          
          </View>
        </View>
      )
    }

export default HeaderAdminScreen