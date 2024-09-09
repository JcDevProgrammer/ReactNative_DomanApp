import { View, Text } from 'react-native'
import React from 'react'
import BodyAdminCalendar from './../../src/screens/adminScreens/adminCalendarScreen/BodyAdminCalendar'
import HeaderAdminCalendar from './../../src/screens/adminScreens/adminCalendarScreen/HeaderAdminCalendar'

const AdminCalendar = () => {
  return (
    <View>
       <HeaderAdminCalendar/>
      <BodyAdminCalendar/>
     
    </View>
  )
}

export default AdminCalendar