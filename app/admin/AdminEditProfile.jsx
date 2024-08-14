import { View, Text } from 'react-native'
import React from 'react'
import BodyAdminEditProfile from '../../src/screens/adminScreens/adminEditProfileScreen/BodyAdminEditProfile'
import HeaderAdminEditProfile from '../../src/screens/adminScreens/adminEditProfileScreen/HeaderAdminEditProfile'

const AdminEditProfile = () => {
  return (
    <View>

      <HeaderAdminEditProfile/>

      <BodyAdminEditProfile/>

    </View>
  )
}

export default AdminEditProfile