import { View, Text, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import styles from './../../styles/screenStyles/userAuthStyles/VerifyEmailStyles';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import app from '../../components/firebase';
import CustomModal from './../../components/CustomModal';

const VerifyEmailScreen = () => {
  const [isModalResent, setResentModal] = useState(false);
  const [isModalFailed, setFailedModal] = useState(false);
  const [isModalNoUser, setNoUser] = useState(false);

  const Resent = () => setResentModal(false);
  const Failed = () => setFailedModal(false);
  const NoUser = () => setNoUser(false);

  const ResendVerificationEmail = async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      try {
        await sendEmailVerification(user);
        console.log('Verification email resent!');
        setResentModal(true);
      } catch (error) {
        console.error('Error resending verification email:', error.message);
        setFailedModal(true);
      }
    } else {
      console.log('No user is currently signed in.');
      setNoUser(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textRegistered}>Registered Successfully</Text>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Before LogIn please</Text>
        <Text style={styles.text}>verify your Email in</Text>
        <Text style={styles.text}>your email account</Text>
      </View>

      <Text>Didn't get the Email verification?</Text>

      <CustomModal
        isVisible={isModalResent}
        onClose={Resent}
        message="Verification email resent"
      />
      <CustomModal
        isVisible={isModalFailed}
        onClose={Failed}
        message="Failed to resend verification email"
      />
      <CustomModal
        isVisible={isModalNoUser}
        onClose={NoUser}
        message="No user is currently signed in"
      />

      <Text style={styles.textResend} onPress={ResendVerificationEmail}>
        Resend
      </Text>

      <ClickSignIn />
    </SafeAreaView>
  );
};

const ClickSignIn = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.containerSignIn}>
      <Text
        style={styles.textSignIn}
        onPress={() => navigation.navigate('LogIn')}
      >
        Click here to Log In
      </Text>
    </View>
  );
};

export default VerifyEmailScreen;
