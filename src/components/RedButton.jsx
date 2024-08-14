import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './../styles/componentStyles/RedButtonStyles'

export default function RedButton({text, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={(onPress) }>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
