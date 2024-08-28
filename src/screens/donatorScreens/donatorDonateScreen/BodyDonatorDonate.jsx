import { View, Text, SafeAreaView, TextInput, Button, Platform} from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import styles from './../../../styles/screenStyles/donatorStyles/DonatorDonateStyles'
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';


import MyDatePicker from '../../../components/MyDatePicker'


const BodyDonatorDonate = () => {
const [food, setFood] = useState(false);
const [medicine, setMedicine] = useState(false);
const [selectedValue, setSelectedValue] = useState(null);
const [pickerOptions, setPickerOptions] = useState([]);

const [quantity, setQuantity] = useState('');
const [description, setDescription] = useState('');

useEffect(() => {
    if (food) {
      setPickerOptions([
        { label: 'Canned Goods', value: 'cannedGoods' },
        { label: 'Vegetables', value: 'vegetables' },
        { label: 'Drinks', value: 'drinks' },
      ]);
    setMedicine (false);
    } else if (medicine) {
      setPickerOptions([
        { label: 'Painkillers', value: 'painkillers' },
        { label: 'Antibiotics', value: 'antibiotics' },
        { label: 'Vitamins', value: 'vitamins' },
      ]);
      setFood (false);
    } else {
      setPickerOptions([]);
    }
    setSelectedValue(""); // Reset selected value when category changes
  }, [food, medicine]);

  const handleQuantityChange = (text) => {
    if (/^\d*$/.test(text)) {
      setQuantity(text);
    }
  };


  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // iOS keeps the picker open
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView style ={styles.container}>
      <View style={styles.containerFoodMedicine}>
   
      <Checkbox
          style={styles.checkbox}
          value={food}
          onValueChange={setFood}
          color={food ? '#4630EB' : undefined}
        />
        <Text style={styles.textFood}>Food</Text>
    
        <Checkbox
          style={styles.checkbox}
          value={medicine}
          onValueChange={setMedicine}
          color={medicine ? '#4630EB' : undefined}
        />
        <Text style={styles.textMedicine}>Medicine</Text>
      </View>
    
        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Select a category..." value="" />
          {pickerOptions.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
        </View>

        <View style={styles.containerQuantity}>
        <Text style={styles.quantityLabel}>Quantity : </Text>
        <TextInput
        style={styles.quantity}
        value={quantity}
        onChangeText={handleQuantityChange}
        keyboardType="numeric"
        placeholder=" Enter"
      />
        </View>

      <View style={styles.containerDate}>
      <Text style={styles.textDate}>Date Received: </Text>
      <MyDatePicker/>
      </View>

      <View style={styles.containerDate}>
      <Text style={styles.textDate}>Date Expired:  </Text>
      <MyDatePicker/>
      </View>
      
     
      


    
      <View style={styles.containerDescription}>
      <Text style={styles.descriptionLabel}>Description:</Text>
      <TextInput
        style={styles.description}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline={true}
        numberOfLines={4}
      />
    </View>
    </SafeAreaView>
  )
}


export default BodyDonatorDonate

