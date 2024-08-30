import React, { useState } from 'react';
import { Platform, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './../styles/componentStyles/CustomDatePickerStyles'

// Conditionally import `react-datepicker` only if running on the web
let DatePicker;
if (Platform.OS === 'web') {
  DatePicker = require('react-datepicker').default;
  require('react-datepicker/dist/react-datepicker.css');
}

// Function to format the date as MM/DD/YYYY
const formatDate = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export default function CustomDatePicker() {
  const [date, setDate] = useState(new Date());
  const [textDate, setTextDate] = useState(formatDate(date)); // State to handle TextInput value
  const [show, setShow] = useState(false);
  const [error, setError] = useState(''); // State to handle error message

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setTextDate(formatDate(currentDate)); // Update TextInput value when date is selected
    setError(''); // Clear any existing error
  };

  const handleWebChange = (date) => {
    setDate(date);
    setTextDate(formatDate(date)); // Update TextInput value on web
    setError(''); // Clear any existing error
  };

  const handleTextInputChange = (text) => {
    setTextDate(text); // Update TextInput state on change
  };

  const handleBlur = () => {
    // Regular expression to validate MM/DD/YYYY format
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

    if (dateRegex.test(textDate)) {
      const [month, day, year] = textDate.split('/').map(Number);
      const parsedDate = new Date(year, month - 1, day);
      if (!isNaN(parsedDate)) {
        setDate(parsedDate);
        setError(''); // Clear error if date is valid
      } else {
        setError('Invalid format');
      }
    } else {
      setError('MM/DD/YYYY');
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      
      {Platform.OS === 'web' ? (
        <View >
          {show && (
            <DatePicker
              selected={date}
              onChange={handleWebChange}
              dateFormat="MM/dd/yyyy" // Format the date as MM/DD/YYYY
              className="date-picker"
              onClickOutside={() => setShow(false)} // Close picker when clicking outside
              inline
            />
          )}
         <View style= {styles.containerInput}>
          <TextInput
            style={[styles.input, error ? { borderColor: 'red' } : null]} // Highlight border if error
            value={textDate} // Controlled TextInput value
            onChangeText={handleTextInputChange} // Update text state on change
            onBlur={handleBlur} // Validate and update date on blur
          />
            <TouchableOpacity onPress={showDatepicker}>
            <Image 
              source={require('./../assets/images/Calendar.jpg')} // Replace with your actual image path
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
          </View>
          <View style={styles.containerError}>
          <Text> </Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null} {/* Display error message */}
          </View>
        </View>
      ) : (
        <View>
          <View style= {styles.containerInput}>
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <TextInput
            style={[styles.input, error ? { borderColor: 'red' } : null]} // Highlight border if error
            value={textDate} // Controlled TextInput value
            onChangeText={handleTextInputChange} // Update text state on change
            onBlur={handleBlur} // Validate and update date on blur
          />
          <TouchableOpacity onPress={showDatepicker}>
            <Image 
              source={require('./../assets/images/Calendar.jpg')} // Replace with your actual image path
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
          </View>


          <Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null} {/* Display error message */}
          </Text>
        </View>
      )}
    </View>
  );
}
