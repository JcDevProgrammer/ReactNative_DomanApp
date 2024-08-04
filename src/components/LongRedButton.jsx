import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './../styles/componentStyles/LongRedButtonStyles'

export default function LongRedButton({text, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={(onPress) }>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}