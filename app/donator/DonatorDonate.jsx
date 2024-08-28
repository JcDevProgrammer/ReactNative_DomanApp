import { View, Text } from 'react-native'
import React from 'react'
import HeaderDonatorDonate from './../../src/screens/donatorScreens/donatorDonateScreen/HeaderDonatorDonate'
import BodyDonatorDonate from './../../src/screens/donatorScreens/donatorDonateScreen/BodyDonatorDonate'

const DonatorDonate = () => {
  return (
    <View>
      <HeaderDonatorDonate/>
      <BodyDonatorDonate/>
    </View>
  )
}

export default DonatorDonate