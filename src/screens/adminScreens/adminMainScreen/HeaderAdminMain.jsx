import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../../styles/appStyles/HeaderAdminStyles'
import { useNavigation } from '@react-navigation/native';

const HeaderAdminScreen = () => {

    const navigation = useNavigation();
    
    return(
        <View style = {styles.container}>
          <View style = {styles.textView}>
            <Text>Admin</Text>
          </View>
          <View style = {styles.imageView}>
            <TouchableOpacity onPress={() => navigation.push('AdminProfile')}>
                <Image
                source={require('./../../../assets/images/ProfileIcon.png')}
                style = {styles.image}
                />
            </TouchableOpacity>
          
          </View>
        </View>
      )
    }

export default HeaderAdminScreen