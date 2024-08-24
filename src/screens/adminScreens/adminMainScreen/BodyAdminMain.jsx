import { View, Text, Image, ScrollView} from 'react-native'
import React from 'react'
import styles from '../../../styles/screenStyles/adminStyles/AdminMainStyles'
import LongRedButton from '../../../components/LongRedButton'
import { useNavigation } from '@react-navigation/native'


const BodyAdminMain = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style = {styles.container}>
        <RedCrossImage/>
          <Text style = {styles.text}>QUEZON CITY-CHAPTER</Text>
            <LongRedButton text={'Calendar'} onPress={()=>navigation.push('AdminCalendar')}/>
            <LongRedButton text={'For Distribution'} onPress={()=>navigation.push('AdminDistribution')}/>
            <LongRedButton text={'Donation for Approval'} onPress={()=>navigation.push('AdminDonationApprov')}/>
            <LongRedButton text={'List of Food'} onPress={()=>navigation.push('AdminFood')}/>
            <LongRedButton text={'List of Medicine'} onPress={()=>navigation.push('AdminMedicine')}/>
      </View>
    </ScrollView>
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

export default BodyAdminMain