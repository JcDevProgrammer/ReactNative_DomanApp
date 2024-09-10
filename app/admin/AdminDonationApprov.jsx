import { View, ScrollView } from 'react-native';
import React from 'react';
import BodyDonationApprov from './../../src/screens/adminScreens/adminDonationApprov/BodyDonationApprov';
import HeaderDonationApprov from './../../src/screens/adminScreens/adminDonationApprov/HeaderDonationApprov';

const AdminDonationApprov = () => {
  return (
    <View >
     
        <HeaderDonationApprov />
       
        <BodyDonationApprov />
  
    </View>
  );
};

export default AdminDonationApprov;
