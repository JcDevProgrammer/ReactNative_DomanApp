import { View, Text } from 'react-native'
import React from 'react'
import HeaderDonatorMain from './../../src/screens/donatorScreens/donatorMainScreen/HeaderDonatorMain'
import BodyDonatorMain from './../../src/screens/donatorScreens/donatorMainScreen/BodyDonatorMain'

const DonatorMain = () => {
  return (
    <View>
      <HeaderDonatorMain/>
      <BodyDonatorMain/>
    </View>
  )
}

export default DonatorMain