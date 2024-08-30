import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 30,
        width: 30,
    },
    textProfile: {
        fontSize:20,

    },
    profileImage:{
        height: 80,
        width: 80,
    },
    profileImageContainer:{
        paddingTop: 10,
        paddingBottom: 20
    },
    text:{
        paddingRight: 5,
        fontSize: 14
    },
    textContainer:{
        flexDirection: 'row',
        paddingBottom: 10
    },
    headerContainer:{
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 35,
        paddingBottom: 10
      },
    headerImageView:{
        paddingRight: 20
    },
    headerImage:{
        height: 30,
        width: 30,
    },
    headerTextView: {
        justifyContent: 'center',
        paddingRight: 30
    },
    headerText: {
        fontSize:20,
        fontWeight: 'bold'
    }

})