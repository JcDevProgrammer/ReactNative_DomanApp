import { View, Text } from 'react-native'
import React from 'react'
import HeaderArdanaMain from '../../src/screens/ardanaScreens/ardanaMainScreen/HeaderArdanaMain'
import BodyArdanaMain from '../../src/screens/ardanaScreens/ardanaMainScreen/BodyArdanaMain'

const ArdanaMain = () => {
  return (
    <View>
      <HeaderArdanaMain/>
      <BodyArdanaMain/> 
    </View>
  )
}

export default ArdanaMain