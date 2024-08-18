import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        paddingBottom: 2,
    },
    inputcontainer: {
        borderWidth:1,
        flexDirection: 'row',
        height: 36,
        width: 300
    },
    inputStyles:{
        paddingLeft: 5,
        width: 270,
        fontSize: 16    
    },
    view: {
        flexDirection: 'row'
    },
    text: {
        color: 'red',
        fontSize: 12,
    },
    placeholderPosition:{
        paddingRight: 200
    },
    textPlaceholder:{
        fontSize: 12
    }
})