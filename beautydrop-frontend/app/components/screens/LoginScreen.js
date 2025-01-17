import * as React from "react";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import app from './firebaseConfig';

const auth = getAuth(app);

const  LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  

  const handleLogin = () => {
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => alert('Logged in successfully!'))
        .catch(error => alert(error.message));
        navigation.navigate('Home');
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => alert('User registered successfully!'))
        .catch(error => alert(error.message));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{  fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      style={{ width: '100%', borderBottomWidth: 1, marginBottom: 15, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={{ width: '100%', borderBottomWidth: 1, marginBottom: 15, padding: 8}}
      />
      <Button title={isLogin ? "Login" : 'Sign Up'} onPress={handleLogin} />
      <Text
        style={{ marginTop: 15, color: 'blue' }}
        onPress={() => setIsLogin(prevState => !prevState)}>
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
      </Text>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     padding: 20 },

//   title: { fontSize: 24, 
//     fontWeight: 'bold', 
//     marginBottom: 20 },

//   input: { width: '100%', 
//     borderBottomWidth: 1,
//      marginBottom: 15, 
//      padding: 8 },

//   switch: { marginTop: 15, 
//     color: 'blue' },
    
// });


// const App = () => {
//   return (
//       <NavigationContainer>
//           <LoginScreen   />
//           <WelcomeScreen />
//           <SignupScreen/>
//           <handleAuth/>
//       </NavigationContainer>
//   );
// };     

export default LoginScreen;
