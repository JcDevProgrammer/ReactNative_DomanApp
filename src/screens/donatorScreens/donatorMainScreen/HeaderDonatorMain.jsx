import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import styles from './../../../styles/screenStyles/donatorStyles/DonatorMainStyles'

const HeaderDonatorMain = () => {
  const navigation = useNavigation();
    
    return(
        <View style = {styles.headerContainer}>
          <View style = {styles.headerTextView}>
            <Text style = {styles.headerTextAdmin}>Donor</Text>
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

export default HeaderDonatorMain;