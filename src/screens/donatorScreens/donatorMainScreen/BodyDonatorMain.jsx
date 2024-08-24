import { View, Text, Image} from 'react-native'
import React from 'react'
import styles from './../../../styles/screenStyles/donatorStyles/DonatorMainStyles'
import LongRedButton from './../../../components/LongRedButton'
import { useNavigation } from '@react-navigation/native'

const BodyDonatorMain = () => {
  const navigation = useNavigation();
  return (
    <View style = {styles.container}>

      <RedCrossImage/>
      <Text style = {styles.text}>QUEZON CITY-CHAPTER</Text>
        <LongRedButton text={'Donate'} onPress={()=>navigation.push('DonatorDonate')}/>
        <LongRedButton text={'View Request'} onPress={()=>navigation.push('DonatorViewRequest')}/>
        <LongRedButton text={'Receipt'} onPress={()=>navigation.push('DonatorReceipt')}/>
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

export default BodyDonatorMain