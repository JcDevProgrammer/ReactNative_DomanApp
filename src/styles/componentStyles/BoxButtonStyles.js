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
    padding: 6,

    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: .8,
    shadowRadius: 5,
    // Android shadow
    elevation: 5,
  },
  button: {
    backgroundColor: '#ff0000', // Bright red for the button
    borderRadius: 10,
    height: 150,
    width: 200,
    borderWidth: 3,
    borderColor: '#8B0000', // Darker border color to enhance 3D effect
  },
  buttonText: {
    paddingTop: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonText2: {
    paddingTop: 12,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
