import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        paddingBottom: 5,
    },
    inputcontainer: {
        borderWidth:1,
        flexDirection: 'row',
        height: 40,
        width: 320
    },
    icon:{
        
    },
    inputStyles:{
        paddingLeft: 5,
        width: 250,
        fontSize: 16    
    },
    view: {
        flexDirection: 'row'
    },
    text: {
        color: 'red'
    },
    placeholderText:{
        paddingRight: 200
    }
})