import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 70
    },
    image:{
        height: 170,
        width: 170,
    },
    icons:{
        height:30,
        width: 30,
    },

    text:{
        paddingBottom: 110,
        paddingTop: 5,
        color: 'red',
        fontSize: 20,
        
    },

    inputContainer:{
        flexDirection: 'row',
        height: 40,
        width: 320,
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
    },
    
    inputContainerPadding:{
       paddingVertical: 10
    },

    input: {
        fontSize: 20,
        height: 40,
        width: 300,
        borderWidth: 1,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },

    textContainer: {
        paddingTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
    
      linkRegister: {
        paddingLeft: 120,
        color: 'blue'
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingTop: 100
      },
      loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#000',
      },

})