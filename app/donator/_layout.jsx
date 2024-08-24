import { Stack } from "expo-router";
import React from "react";


export default function RootLayout() {
  return (
    
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="DonatorMain"/>
      <Stack.Screen name="DonatorProfile"/>
      <Stack.Screen name="DonatorEditProfile"/>
      <Stack.Screen name="DonatorDonate"/>
      <Stack.Screen name="DonatorViewRequest"/>
      <Stack.Screen name="DonatorReceipt"/>
    </Stack>
  );
  
}
