import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    Container:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40
    },
    backButton:{
        height: 30,
        width: 30
    },
    viewBackButton:{
        paddingRight: 200
    },
    textContainer:{
        paddingTop: 90    
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textChange: {
        fontSize: 15,
        paddingTop: 30
    },
    textResend: {
        fontSize: 14,
        color: 'blue',
        paddingBottom: 30
    }


})