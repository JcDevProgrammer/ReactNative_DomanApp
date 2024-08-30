import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import styles from './../../../styles/screenStyles/ardanaStyles/ArdanaRequestStyles'

const HeaderArdanaRequest = () => {
  const navigation = useNavigation();
    
    return(
        <View style = {styles.headerContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./../../../assets/images/BackIcon.jpg')}
            style= {styles.headerBackIcon}
            />
            </TouchableOpacity>
          </View>


          <View style = {styles.headerTextView}>
            <Text style = {styles.headerTextAdmin}>Request for </Text>
            <Text style = {styles.headerTextAdmin}>Distribution</Text>
          </View>
          <View style = {styles.headerImageView}>
            <TouchableOpacity onPress={() => navigation.push('DonatorProfile')}>
                <Image
                source={require('./../../../assets/images/ProfileIcon.png')}
                style = {styles.headerImage}
                />
            </TouchableOpacity>
          </View>
        </View>
      )
}

export default HeaderArdanaRequest;