import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './../styles/componentStyles/BoxButtonStyles'

export default function BoxButton({text, text2, onPress}) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.buttonShadow}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
          <Text style={styles.buttonText2}>{text2}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}