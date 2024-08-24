import { View, Text } from 'react-native'
import React from 'react'
import HeaderArdanaEditProfile from '@/src/screens/ardanaScreens/ardanaEditProfile/HeaderArdanaEditProfile'
import BodyArdanaEditProfile from './../../src/screens/ardanaScreens/ardanaEditProfile/BodyArdanaEditProfile'

const ArdanaEditProfile = () => {
  return (
    <View>
      <HeaderArdanaEditProfile/>
      <BodyArdanaEditProfile/>
    </View>
  )
}

export default ArdanaEditProfile