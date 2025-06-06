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
    shadowOpacity: .8,
    shadowRadius: 5,
    // Android shadow
    elevation: 5,
  },
  button: {
    backgroundColor: '#ff0000', // Bright red for the button
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderColor: '#8B0000', // Darker border color to enhance 3D effect
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
