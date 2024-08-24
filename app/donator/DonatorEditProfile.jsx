import { View, Text } from 'react-native'
import React from 'react'
import HeaderDonatorEditProfile from './../../src/screens/donatorScreens/donatorEditProfile/HeaderDonatorEditProfile'
import BodyDonatorEditProfile from './../../src/screens/donatorScreens/donatorEditProfile/BodyDonatorEditProfile'

const DonatorEditProfile = () => {
  return (
    <View>
      <HeaderDonatorEditProfile/>
      <BodyDonatorEditProfile/>
    </View>
  )
}

export default DonatorEditProfile