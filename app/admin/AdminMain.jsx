import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import BodyAdminMain from '../../src/screens/adminScreens/adminMainScreen/BodyAdminMain'
import HeaderAdminMain from '../../src/screens/adminScreens/adminMainScreen/HeaderAdminMain'

const AdminMain = () => {
  return (
    <View>
      <HeaderAdminMain/>
      <BodyAdminMain/>
    </View>
  )
}

export default AdminMain