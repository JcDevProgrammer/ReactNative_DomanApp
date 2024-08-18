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

})