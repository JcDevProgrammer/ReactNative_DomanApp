import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const SmallButton = ({ text, onPress, color = 'red', style = {} }) => {
  const getButtonColor = () => {
    switch (color) {
      case 'red':
        return '#FF0000'; // Red
      case 'green':
        return '#00FF00'; // Green
      case 'blue':
        return '#0000FF'; // Blue
      default:
        return '#FF0000'; // Default is Red if no valid color is provided
    }
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getButtonColor() }, style]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    padding: 5
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default SmallButton;
