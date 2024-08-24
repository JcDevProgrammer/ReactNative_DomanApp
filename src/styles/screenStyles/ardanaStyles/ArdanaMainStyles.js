import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 10
    },
    text:{
        paddingBottom: 20,
        paddingTop: 10,
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold'
    },
    headerContainer:{
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 20
      },
    headerImageView:{
        paddingLeft: 70
    },
    headerImage:{
        height: 40,
        width: 40,
    },
    headerTextView: {
        justifyContent: 'center',
        paddingLeft: 115
    },
    headerText: {
        fontSize:20
    },
    headerTextAdmin: {
        fontSize:24,
        fontWeight: 'bold'
    }

    }
)