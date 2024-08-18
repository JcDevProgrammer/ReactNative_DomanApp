import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    textRegistered:{
        fontSize: 26,
        fontWeight: 'bold',
        color: 'green',
        paddingTop: 60
    },
    textContainer:{
        paddingTop: 50,
        paddingBottom: 20
    },
    textResend: {
        color: 'blue',
        fontSize: 13
    },
    containerSignIn:{
        paddingTop: 70,
        paddingLeft: 110
    },
    textSignIn:{
        color: 'red'
    },
    text:{
        fontSize: 17,
        fontWeight: 'bold'
    }

})