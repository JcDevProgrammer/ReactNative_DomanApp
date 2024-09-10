import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10, // Padding around the main container
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    flexDirection: 'row',
  },
  tableContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row', // Align header cells horizontally
    backgroundColor: '#f8f8f8', // Light background color for header
    borderWidth: 1, // Add bottom border
  },
  headerCell: {
    fontWeight: 'bold', // Make text bold
    textAlign: 'center', // Center the text horizontally
    padding: 10, // Add some padding for better readability
    borderWidth: 1,
    width: 140
  },
  rowContainer: {
    flexDirection: 'row', // Align row cells horizontally
    borderWidth: 1, // Add bottom border between rows

  },
  quantityHeader:{
    textAlign: 'center', // Center the text horizontally
    padding: 10, // Add some padding for better readability
    borderWidth: 1,
    fontWeight: 'bold', // Make text bold
    width: 60,
  },
  quantityCell:{
    textAlign: 'center', // Center the text horizontally
    padding: 10, // Add some padding for better readability
    borderWidth: 1,
    width: 60,
  },
  descriptionHeader:{
    textAlign: 'center', // Center the text horizontally
    padding: 10, // Add some padding for better readability
    borderWidth: 1,
    fontWeight: 'bold', // Make text bold
    width: 300,
  },
  descriptionCell:{
    textAlign: 'center', // Center the text horizontally
    padding: 10, // Add some padding for better readability
    borderWidth: 1,
    width: 300,
  },
  cell: {
    textAlign: 'center', // Center the text horizontally
    padding: 10, // Add some padding for better readability
    borderWidth: 1,
    width: 140
  },
  buttonCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center the delete button
  },
  loader: {
    flex: 1,
    justifyContent: 'center', // Center loader vertically
    alignItems: 'center', // Center loader horizontally
  },
  acceptDelete: {
    flexDirection: 'row'
  }
});
