import { StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar'

export default StyleSheet.create ({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImageContainer:{
        paddingTop: 10,
        paddingBottom: 20
    },
    image: {
        height: 80,
        width: 80
    },
    headerContainer:{
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 35
      },
    headerImageView:{
        paddingRight: 70
    },
    headerImage:{
        height: 30,
        width: 30,
    },
    headerTextView: {
        justifyContent: 'center',
        paddingRight: 105
    },
    headerText: {
        fontSize:20,
        fontWeight: 'bold'
    }
})