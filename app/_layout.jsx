import { Stack } from "expo-router";
import React from "react";


export default function RootLayout() {
  return (
    
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="DomanLogIn" />
      <Stack.Screen name="DomanRegistration" />
      <Stack.Screen name="DomanForgotPassword"/>
    </Stack>
  );
  
}

