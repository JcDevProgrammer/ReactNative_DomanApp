import { View, Text, Image} from 'react-native'
import React from 'react'
import styles from './../../../styles/screenStyles/adminStyles/AdminMainStyles'
import LongRedButton from './../../../components/LongRedButton'
import { useNavigation } from '@react-navigation/native'


const BodyArdanaMain = () => {
  const navigation = useNavigation();
  return (
    <View style = {styles.container}>

      <RedCrossImage/>

      <Text style = {styles.text}>QUEZON CITY-CHAPTER</Text>
          <LongRedButton text={'Calendar'} onPress={()=>navigation.push('ArdanaCalendar')}/>
          <LongRedButton text={'Request For Distribution'} onPress={()=>navigation.push('ArdanaRequest')}/>
          <LongRedButton text={'List of Food'} onPress={()=>navigation.push('ArdanaFood')}/>
          <LongRedButton text={'List of Medicine'} onPress={()=>navigation.push('ArdanaMedicine')}/>
    </View>
  )
}

const RedCrossImage = () => {
    return(
     <Image
          source={require('./../../../assets/images/RedCrossLogo.jpg')}
          style= {styles.image}
          />
    )
  }

export default BodyArdanaMain