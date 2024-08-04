import { View, Text, Image} from 'react-native'
import React from 'react'
import styles from './../styles/screenStyles/AdminMainStyles'
import LongRedButton from '../components/LongRedButton'


const AdminMainScreen = () => {
  return (
    <View style = {styles.container}>

      <Text>Admin</Text>

      <RedCrossImage/>

      <Text style = {styles.text}>QUEZON CITY-CHAPTER</Text>

        <LongRedButton text={'Donation For Approval'}/>
        <LongRedButton text={'Request Donation'}/>
        <LongRedButton text={'List of Food'}/>
        <LongRedButton text={'List of Medicine'}/>
    </View>
  )
}

const RedCrossImage = () => {
    return(
     <Image
          source={require('./../assets/images/RedCrossLogo.jpg')}
          style= {styles.image}
          />
    )
  }
export default AdminMainScreen