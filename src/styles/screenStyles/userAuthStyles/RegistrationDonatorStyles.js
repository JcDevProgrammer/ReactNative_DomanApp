import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems: 'center'
    },
    backButtonContainer:{
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingRight: 300,
        paddingTop: 20,
        paddingBottom: 10
      },
    view:{
        height: 40,
        paddingLeft: 10

    },
    image:{
        height: 30,
        width: 30,
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