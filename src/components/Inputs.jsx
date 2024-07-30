import { View, Text, TextInput, Image} from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form'
import styles from './../styles/componentStyles/InputStyles'

const Inputs = ({control, error, name, placeholder}) => {
  return (

      <Controller
      name = {name}
      control = {control}
      render = {({ field: {onChange, onBlur, value}}) => (

        <TextInput
        placeholder= {placeholder}  
        style = {styles.inputStyles}
        value = {value}
        onBlur= {onBlur}
        onChangeText ={ onChange}
        />

      )}
      />

  )
}

export default Inputs