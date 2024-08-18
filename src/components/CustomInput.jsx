import { View, Text, TextInput, Image} from 'react-native'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import styles from '../styles/componentStyles/InputStyles'
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomInput = ({control, rules ={}, iconName, errors, name, placeholder, nameDisplay, keyboardType, ...props}) => {
  return (
  <>
  <View style = {styles.placeholderPosition}>
  <Text style={styles.textPlaceholder}>{nameDisplay}</Text>
  </View>

    <View style= {styles.container}>

      <Controller
      name = {name}
      control = {control}
      rules={rules}
      render = {({ field: {onChange, onBlur, value}, fieldState: {error}}) => (

        <View style={styles.inputcontainer}>

        {iconName && <Icon name={iconName} size={30} color="red" />}

        <TextInput
        placeholder= {placeholder}
        nameDisplay={nameDisplay} 
        style = {styles.inputStyles}
        value = {value}
        onBlur= {onBlur}
        onChangeText ={ onChange}
        keyboardType= {keyboardType}
        {...props}
        />
        </View>
      )}
      />
      <View style= {styles.view}>
      <Text>{" "}</Text>
      {errors && errors [name] && <Text style = {styles.text}>{errors[name]?.message}</Text>}
      </View>
      </View>
      
      </>
  )
}

CustomInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  iconName: PropTypes.string,
  errors: PropTypes.object,
};

export default CustomInput;