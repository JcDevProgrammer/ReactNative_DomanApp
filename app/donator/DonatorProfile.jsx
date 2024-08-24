import { View, Text } from 'react-native'
import React from 'react'
import HeaderDonatorProfile from './../../src/screens/donatorScreens/donatorProfileScreen/HeaderDonatorProfile'
import BodyDonatorProfile from './../../src/screens/donatorScreens/donatorProfileScreen/BodyDonatorProfile'

const DonatorProfile = () => {
  return (
    <View>
      <HeaderDonatorProfile/>
      <BodyDonatorProfile/>
    </View>
  )
}

export default DonatorProfile