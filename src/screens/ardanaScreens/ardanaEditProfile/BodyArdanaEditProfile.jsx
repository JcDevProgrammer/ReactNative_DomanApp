import { View, Text, Image, SafeAreaView} from 'react-native'
import React from 'react'
import styles from '../../../styles/screenStyles/ardanaStyles/ArdanaEditProfileStyles'
import { useForm } from 'react-hook-form'
import CustomInput from './../../../components/CustomInput'

const BodyArdanaEditProfile = () => {

  const {
    control,
    handleSubmit,
    formState: {
    errors
    }
  } = useForm(
    {
      defaultValues: {
        fullName: "",
        email: "",
        phoneNumber: "",
        birthday: "",
      },
  
    }
  )

  return (

    <SafeAreaView style= {styles.container}>
      <View >
        <EditProfileImage/>
      </View>

      <View>
          <CustomInput
          control={control}
          name={'fullName'}
          placeholder={'Full Name      '}
          iconName={"person"}
          errors={errors}
          />

          <CustomInput
          control={control}
          name={'email'}
          placeholder={'Email      '}
          iconName={"email"}
          errors={errors}
          />

          <CustomInput
          control={control}
          name={'phoneNumber'}
          placeholder={'Phone      '}
          iconName={"phone"}
          errors={errors}
          />

          <CustomInput
          control={control}
          name={'birthday'}
          placeholder={'BirthDay      '}
          iconName={"calendar"}
          errors={errors}
          />
      </View>
    </SafeAreaView>
  )
}



const EditProfileImage = () =>{
  return(
    
      <View style = {styles.profileImageContainer}>
        <Image 
          source={require('./../../../assets/images/EditProfileIcon.png')}
          style = {styles.image}
          />
      </View>

    )
}

export default BodyArdanaEditProfile