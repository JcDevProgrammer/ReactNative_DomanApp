import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import styles from '../../../styles/screenStyles/adminStyles/AdminProfileStyles';
import RedButton from '../../../components/RedButton';
import app from './../../../components/firebase' // Ensure correct path to config

const db = getFirestore(app);
const auth = getAuth(app);

const BodyArdanaProfile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    birthday: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'Donator', user.uid); // Reference to the document
          const userDoc = await getDoc(userDocRef); // Fetch the document
          if (userDoc.exists()) {
            setUserData(userDoc.data()); // Update state with fetched data
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('No user is logged in');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileImage />
      <Name name={userData.name} />
      <Email email={userData.email} />
      <Phone phone={userData.phoneNumber} />
      <Birthday birthday={userData.birthday} />

      <RedButton
        text={'Edit Profile'}
        onPress={() => navigation.push('DonatorEditProfile')}
      />

      <RedButton
        text={'Log Out'}
        onPress={() => {
          signOut(auth);
          navigation.navigate('userAuth');
        }}
      />
    </SafeAreaView>
  );
};

const ProfileImage = () => {
  return (
    <View style={styles.profileImageContainer}>
      <Image
        source={require('./../../../assets/images/ProfileIcon.png')}
        style={styles.profileImage}
      />
    </View>
  );
};

const Name = ({ name }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>Name:</Text>
      <Text>{name}</Text>
    </View>
  );
};

const Email = ({ email }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>Email:</Text>
      <Text>{email}</Text>
    </View>
  );
};

const Phone = ({ phone}) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>Phone:</Text>
      <Text>{phone}</Text>
    </View>
  );
};

const Birthday = ({ birthday }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>Birthday:</Text>
      <Text>{birthday}</Text>
    </View>
  );
};


export default BodyArdanaProfile;