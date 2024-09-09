import { useState, useEffect } from'react';
import React from 'react'
import { View, Text, StyleSheet } from'react-native';
import Modal from 'react-native-modal';

const CustomModal = ({ isVisible, onClose, message }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 1 second durationreturn() =>clearTimeout(timer); // Clear timeout on unmount or isVisible change
      return () => clearTimeout(timer); 
    }
  }, [isVisible]);

  return (
    <Modal isVisible = {isVisible} 
    animationIn = "fadeIn"
    animationOut = "fadeOut"
    backdropOpacity = {0.4}
    onBackdropPress={onClose} // Closemodalifbackdropispressedstyle={styles.modal}
    >
    
    <View style = {styles.Container}>
    <View style = {styles.modalView}>
    <Text style={styles.modalText}>{message}</Text>
    </View>
    </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1
  },
  modalText: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default CustomModal;

/*
import { useState } from'react';
import CustomModal from'./../../components/CustomModal'; 

-----------------------------------------------------------

const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);           
  };                                 // insert this to function for button to show the modal

  const closeModal = () => {
    setModalVisible(false);           
  };                                 // before return statement



-------------------------------------------------------------------

<CustomModal isVisible={isModalVisible}          
      onClose={closeModal}
      message="This is a 1-second modal!"
      />                                            //return statement






*/