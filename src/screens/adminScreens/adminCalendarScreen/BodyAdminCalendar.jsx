import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Modal, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RedButton from '@/src/components/RedButton';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const getStartDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const ArdanaCalendar = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activities, setActivities] = useState({});
  const [newActivity, setNewActivity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingActivityIndex, setEditingActivityIndex] = useState(null);
  const [activityToEdit, setActivityToEdit] = useState('');
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const handleTimeChange = (event, selected) => {
    setShowTimePicker(false);
    if (selected) setSelectedTime(selected);
  };

  const showTimePickerModal = () => setShowTimePicker(true);

  const handleAddActivity = () => {
  if (newActivity.trim()) {
    const activityDate = `${selectedMonth + 1}/${selectedDay}/${selectedYear}`;
    const activityTime = `${selectedTime.getHours()}:${selectedTime.getMinutes()}`;

    setActivities(prevActivities => ({
      ...prevActivities,
      [activityDate]: [
        ...(prevActivities[activityDate] || []),
        { text: `${newActivity} at ${activityTime}` },
      ],
    }));

    console.log(`${activityDate} - ${newActivity} at ${activityTime}`);
    setNewActivity('');
    setShowModal(false); // Close modal after adding activity
  }
};

  const handleEditActivity = (index) => {
    setEditingActivityIndex(index);
    setActivityToEdit(activities[`${selectedMonth + 1}/${selectedDay}/${selectedYear}`][index].text);
  };

 const handleSaveEdit = () => {
  const activityDate = `${selectedMonth + 1}/${selectedDay}/${selectedYear}`;
  const activityTime = `${selectedTime.getHours()}:${selectedTime.getMinutes()}`;

  setActivities(prevActivities => {
    const updatedActivities = prevActivities[activityDate].map((activity, index) =>
      index === editingActivityIndex
        ? { text: `${activityToEdit} at ${activityTime}` }
        : activity
    );
    
    return { ...prevActivities, [activityDate]: updatedActivities };
  });

  console.log(`${activityDate} - Updated activity to: ${activityToEdit} at ${activityTime}`);
  setEditingActivityIndex(null);
  setActivityToEdit('');
};

const handleDeleteActivity = (index) => {
  Alert.alert('Delete Activity', 'Are you sure you want to delete this activity?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Delete',
      onPress: () => {
        const activityDate = `${selectedMonth + 1}/${selectedDay}/${selectedYear}`;

        setActivities(prevActivities => {
          const updatedActivities = prevActivities[activityDate].filter((_, i) => i !== index);
          
          // Check if the deleted activity is the one being edited
          if (index === editingActivityIndex) {
            setEditingActivityIndex(null);
            setActivityToEdit(''); // Reset editing state
          }

          if (updatedActivities.length > 0) {
            return { ...prevActivities, [activityDate]: updatedActivities };
          } else {
            const { [activityDate]: _, ...rest } = prevActivities;
            return rest;
          }
        });

        console.log(`${activityDate} - Deleted activity at index: ${index}`);
      },
    },
  ]);
};


  const renderDays = () => {
    const totalDays = daysInMonth(selectedYear, selectedMonth);
    const startDay = getStartDayOfMonth(selectedYear, selectedMonth);
    let daysArray = [];

    for (let i = 0; i < startDay; i++) {
      daysArray.push(<View key={`empty-${i}`} style={styles.dayBox} />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const activityDate = `${selectedMonth + 1}/${day}/${selectedYear}`;
      const hasActivity = activities[activityDate]?.length > 0;
      daysArray.push(
        <TouchableOpacity
          key={day}
          onPress={() => {
            setSelectedDay(day);
            setShowModal(false);
          }}
          style={[
            styles.dayBox,
            selectedDay === day && styles.selectedDayBox,
            hasActivity && styles.activityDayBox,
          ]}
          >
          <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return daysArray;
  };

  const renderYearColumns = () => {
    const years = Array.from({ length: 37 }, (_, i) => 2024 + i);
    const columns = 3;
    const rows = Math.ceil(years.length / columns);

    return (
      <ScrollView contentContainerStyle={styles.yearColumnsContainer}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.yearRow}>
            {Array.from({ length: columns }).map((_, colIndex) => {
              const year = years[rowIndex * columns + colIndex];
              return year ? (
                <TouchableOpacity
                  key={year}
                  onPress={() => {
                    setSelectedYear(year);
                    setShowYearPicker(false);
                  }}
                  style={styles.pickerItem}
                >
                  <Text style={styles.pickerText}>{year}</Text>
                </TouchableOpacity>
              ) : (
                <View key={`empty-${colIndex}`} style={styles.pickerItem} />
              );
            })}
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CALENDAR</Text>

      {/* Calendar navigation */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setSelectedMonth(prev => prev === 0 ? 11 : prev - 1)}>
          <Text style={styles.navArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {months[selectedMonth]} {selectedYear}
        </Text>
        <TouchableOpacity onPress={() => setSelectedMonth(prev => prev === 11 ? 0 : prev + 1)}>
          <Text style={styles.navArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Weekdays */}
      <View style={styles.weekDaysContainer}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.weekDayBox}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Days */}
      <View style={styles.daysContainer}>
        {renderDays()}
      </View>

      {/* Activities list */}
      <View style={styles.activitiesContainer}>
        <Text style={styles.activitiesTitle}>Activities/Notes</Text>
        <FlatList
          data={activities[`${selectedMonth + 1}/${selectedDay}/${selectedYear}`] || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>{item.text}</Text>
              <TouchableOpacity onPress={() => handleEditActivity(index)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteActivity(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noActivityText}>No activities for this day.</Text>}
        />
      </View>

      {/* RedButton to trigger modal */}
      <RedButton onPress={() => setShowModal(true)} />

      {/* Activity modal triggered by RedButton */}
      {showModal && (
        <Modal visible={showModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add or Edit Activity</Text>
              <TextInput
                value={newActivity}
                onChangeText={setNewActivity}
                placeholder="Enter activity description..."
                style={styles.input}
              />
              <TouchableOpacity onPress={handleAddActivity} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Activity</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={showTimePickerModal} style={styles.timeButton}>
                <Text style={styles.addButtonText}>Select Time</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display="default"
                  onChange={handleTimeChange}
                />
              )}
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e74c3c',
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  navArrow: {
    fontSize: 24,
    color: '#3498db',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekDayBox: {
    width: '14%',
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  daysContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  dayBox: {
    width: '14%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  selectedDayBox: {
    backgroundColor: '#3498db',
    borderRadius: 30,
  },
  selectedDayText: {
    color: '#fff',
  },
  activityDayBox: {
    borderColor: '#e74c3c',
    borderWidth: 1,
  },
  activitiesContainer: {
    marginTop: 20,
  },
  cancelButton: {
  padding: 10,
  backgroundColor: '#e74c3c',
  borderRadius: 5,
  marginLeft: 10,
},
  cancelButtonText: {
  color: '#fff',
},
  activitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  activityText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
  noActivityText: {
    textAlign: 'center',
    color: '#95a5a6',
  },
  editContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    marginVertical: 10,
  },
  addButtonText: {
    color: '#fff',
  },
  timeButton: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    marginVertical: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#95a5a6',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerItem: {
    paddingVertical: 10,
    width: '30%',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  yearColumnsContainer: {
    flexDirection: 'column',
  },
  yearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});

export default ArdanaCalendar;