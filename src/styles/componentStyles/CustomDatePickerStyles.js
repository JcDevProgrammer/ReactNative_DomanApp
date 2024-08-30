import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    calendarIcon: {
        width: 30,
        height: 30,
        marginTop: 10,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        width: 110
      },
      containerInput:{
        flexDirection: 'row',
        borderWidth: 1
      },
      containerError:{
        flexDirection: 'row',
      },
      errorText: {
        color: 'red',
        marginTop: 5,
      },
})