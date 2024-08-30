import { View, Text } from 'react-native'
import React from 'react'
import BodyArdanaRequest from './../../src/screens/ardanaScreens/ardanaRequestScreen/BodyArdanaRequest'
import HeaderArdanaRequest from './../../src/screens/ardanaScreens/ardanaRequestScreen/HeaderArdanaRequest'


const ArdanaRequest = () => {
  return (
    <View>
      <HeaderArdanaRequest/>
      <BodyArdanaRequest/>
    </View>
  )
}

export default ArdanaRequest