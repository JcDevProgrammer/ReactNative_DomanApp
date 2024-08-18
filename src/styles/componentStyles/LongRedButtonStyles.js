import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop:10
  },
  buttonShadow: {
    backgroundColor: '#a00000', // Darker red for shadow
    borderRadius: 10,
    padding: 2,

    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    // Android shadow
    elevation: 5,
  },
  button: {
    backgroundColor: '#ff0000', // Bright red for the button
    borderRadius: 10,
    height: 50,
    width: 265,
    borderWidth: 2,
    borderColor: '#8B0000', // Darker border color to enhance 3D effect
  },
  buttonText: {
    paddingTop: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
