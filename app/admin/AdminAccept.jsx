import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import HeaderAdminAccept from './../../src/screens/adminScreens/adminAcceptScreen/HeaderAdminAccept';
import BodyAdminAccept from './../../src/screens/adminScreens/adminAcceptScreen/BodyAdminAccept';

const AdminAccept = () => {
  return (
    <View style={styles.container}>
      <HeaderAdminAccept />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <BodyAdminAccept />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20, // or any padding you need
  },
});

export default AdminAccept;