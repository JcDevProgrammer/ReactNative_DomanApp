import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="LogIn" />  
      <Stack.Screen name="Registration"/>
      <Stack.Screen name="ForgotPassword"/>
    </Stack>
  );
}