import { View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import BodyAdminProfile from '../../src/screens/adminScreens/adminProfileScreen/BodyAdminProfile'
import HeaderAdminProfile from '../../src/screens/adminScreens/adminProfileScreen/HeaderAdminProfile'

const AdminProfile = () => {
  return (
    <View>

      <HeaderAdminProfile/>

      <BodyAdminProfile/>
      
    </View>
  )
}


export default AdminProfile