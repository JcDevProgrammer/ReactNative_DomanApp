import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 10
    },
    containerFoodMedicine:{
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 10,
    },
    textFood:{
        paddingRight: 60,
        paddingLeft: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    textMedicine:{
        paddingLeft: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    pickerContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        width: 250,
    },
    picker: {
        width: '100%',
        height: 30,
    },
    containerQuantity:{
        flexDirection: 'row',
        paddingVertical: 10,
    },
    quantity:{
        borderWidth: 1,
        width: 50
    },
    quantityLabel: {
        paddingRight: 5,
        fontSize: 14,
        fontWeight: 'bold'
    },
    containerDescription:{
        
    },
    descriptionLabel:{
        fontSize: 14,
        fontWeight: 'bold'
    },
    description:{
        borderWidth: 1,
        width: 250
    },
    containerDate:{
        flexDirection: 'row',
        paddingVertical: 5,

    },
    textDate:{
        paddingTop: 10,
        fontWeight: 'bold'
    },
    headerContainer:{
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 30
      },
    headerImageView:{
        paddingLeft: 50
    },
    headerImage:{
        height: 40,
        width: 40,
    },
    headerTextView: {
        justifyContent: 'center',
        paddingLeft: 85,
    },
    headerText: {
        fontSize:20
    },
    headerTextAdmin: {
        fontSize:24,
        fontWeight: 'bold'
    },
    headerBackIcon: {
        height: 30,
        width: 30
    }
    }
)