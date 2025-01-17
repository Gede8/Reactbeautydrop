
import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

import { useNavigation } from '@react-navigation/native';





const Logout = () => {

  const navigation =  useNavigation();

  const auth = getAuth();


  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'You have been logged out.');
      navigation.replace('Login'); // Navigate to Login screen
    } catch (error) {
      Alert.alert('Error', 'Failed to log out.');
      console.error('Logout Error:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center',
      alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Are you sure you want to log out?</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
// });

export default Logout;
