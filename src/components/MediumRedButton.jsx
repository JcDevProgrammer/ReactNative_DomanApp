import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/componentStyles/MediumRedButtonStyles'

export default function MediumRedButton({text, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={(onPress) }>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}