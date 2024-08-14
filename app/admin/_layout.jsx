import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="AdminMain"/>
      <Stack.Screen name="AdminProfile"/>
      <Stack.Screen name="AdminEditProfile"/>
    </Stack>
  );
}
