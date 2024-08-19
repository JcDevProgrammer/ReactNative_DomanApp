import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="LogIn" /> 
      <Stack.Screen name ="ForgotChangePass" />
      <Stack.Screen name ="VerifyEmail" /> 
      <Stack.Screen name="Registration"/>
      <Stack.Screen name="RegistrationSelect"/>
      <Stack.Screen name="RegistrationDonator"/>
      <Stack.Screen name="ForgotPassword"/>
    </Stack>
  );
}