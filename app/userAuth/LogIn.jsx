import { View, Text} from 'react-native'
import React from 'react'
import styles from '../../src/styles/appStyles/DomanLogInStyles'
import { useNavigation } from '@react-navigation/native';

import LogInScreen from '../../src/screens/userAuthScreens/LogInScreen'


const LogIn = () => {
  return (
    <View >
      <View >
        <LogInScreen/>
      </View>

      <View >
         <ForgotPasswordandRegistration/>
      </View>
    </View>
  );
};


const ForgotPasswordandRegistration = () =>{

  const navigation = useNavigation();

  return(

    <View style = {styles.textContainer}>

      <Text 
      onPress={() => navigation.push('ForgotPassword')}>Forgot Password
      </Text>
        
      <Text 
      style = {styles.linkRegister} 
      onPress={() => navigation.push('RegistrationSelect')}>Register
      </Text>
      
    </View>
  )
}



export default LogIn;

