import { Stack } from "expo-router";
import React from "react";


export default function RootLayout() {
  return (
    
    <Stack screenOptions={{headerShown:false}}>
       
      <Stack.Screen name="ArdanaMain"/>
      <Stack.Screen name= "ArdanaProfile"/>
      <Stack.Screen name= "ArdanaEditProfile"/>
      <Stack.Screen name= "ArdanaCalendar"/>
      <Stack.Screen name= "ArdanaMedicine"/>
      <Stack.Screen name= "ArdanaFood"/>
      <Stack.Screen name= "ArdanaRequest"/>
    </Stack>
  );
  
}
