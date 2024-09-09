import React from 'react';
import { Platform, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './../styles/componentStyles/CustomDatePickerStyles';

// Conditionally import react-datepicker only if running on the web
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

const MyDatePicker = ({ date, setDate }) => {
  const [textDate, setTextDate] = React.useState(formatDate(date));
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    setTextDate(formatDate(date));
  }, [date]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setTextDate(formatDate(currentDate));
    setError('');
  };

  const handleWebChange = (date) => {
    setDate(date);
    setTextDate(formatDate(date));
    setError('');
  };

  const handleTextInputChange = (text) => {
    setTextDate(text);
  };

  const handleBlur = () => {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (dateRegex.test(textDate)) {
      const [month, day, year] = textDate.split('/').map(Number);
      const parsedDate = new Date(year, month - 1, day);
      if (!isNaN(parsedDate)) {
        setDate(parsedDate);
        setError('');
      } else {
        setError('Invalid date');
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
        <View>
          {show && (
            <DatePicker
              selected={date}
              onChange={handleWebChange}
              dateFormat="MM/dd/yyyy"
              className="date-picker"
              onClickOutside={() => setShow(false)}
              inline
            />
          )}
          <View style={styles.containerInput}>
            <TextInput
              style={[styles.input, error ? { borderColor: 'red' } : null]}
              value={textDate}
              onChangeText={handleTextInputChange}
              onBlur={handleBlur}
            />
            <TouchableOpacity onPress={showDatepicker}>
              <Image 
                source={require('./../assets/images/Calendar.jpg')}
                style={styles.calendarIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerError}>
            <Text>{error ? <Text style={styles.errorText}>{error}</Text> : null}</Text>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.containerInput}>
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
              style={[styles.input, error ? { borderColor: 'red' } : null]}
              value={textDate}
              onChangeText={handleTextInputChange}
              onBlur={handleBlur}
            />
            <TouchableOpacity onPress={showDatepicker}>
              <Image 
                source={require('./../assets/images/Calendar.jpg')}
                style={styles.calendarIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerError}>
            <Text>{error ? <Text style={styles.errorText}>{error}</Text> : null}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default MyDatePicker;
