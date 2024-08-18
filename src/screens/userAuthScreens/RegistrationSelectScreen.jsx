import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import BoxButton from './../../components/BoxButton'
import styles from './../../styles/screenStyles/userAuthStyles/RegistrationSelectScreenStyles'
import { useNavigation } from '@react-navigation/native'


const RegistrationSelectScreen = () => {
    const navigation = useNavigation();

  return (
    <View style = {styles.container}>
        
        <View style = {styles.imageView}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <Image
                  source={require('./../../../src/assets/images/BackIcon.jpg')}
                  style = {styles.image}
                />
            </TouchableOpacity>
        </View>

        <View style ={styles.boxButtonContainer}>
            <BoxButton 
            text={'RedCross Volunteer'}
            text2={'Ardanna Registration'}
            onPress={()=>navigation.push('Registration')}
            />
        </View>
    
      <BoxButton
      text={'Donor Registration'}
      text2={'Individuals, Organizations or Company'}
      onPress={()=>navigation.push('RegistrationRedCross')}
      />
    </View>
  )
}



export default RegistrationSelectScreen