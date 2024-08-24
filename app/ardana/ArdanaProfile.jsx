import { View, Text } from 'react-native'
import React from 'react'
import HeaderArdanaProfile from './../../src/screens/ardanaScreens/ardanaProfileScreen/HeaderArdanaProfile'
import BodyArdanaProfile from './../../src/screens/ardanaScreens/ardanaProfileScreen/BodyArdanaProfile'

const ArdanaProfile = () => {
  return (
    <View>
      <HeaderArdanaProfile/>
      <BodyArdanaProfile/>
    </View>
  )
}

export default ArdanaProfile;