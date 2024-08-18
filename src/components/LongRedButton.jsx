import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './../styles/componentStyles/LongRedButtonStyles'

export default function LongRedButton({text, onPress}) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.buttonShadow}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}