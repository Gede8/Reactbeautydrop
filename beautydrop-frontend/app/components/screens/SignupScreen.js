import React from 'react-native';
import { useState} from 'react';
import { View, Text, TextInput, Button,  Alert } from 'react-native';
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
// Ensure this is the correct path to your firebase.js
import app from './firebaseConfig'

const auth = getAuth(app);
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login'); 
      // Navigate to the Login screen after signup
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', }}>Create an Account</Text>

      <TextInput
        style={{ height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, borderRadius: 8, paddingHorizontal: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={{ height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, borderRadius: 8, paddingHorizontal: 10 }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={{ height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 15,  borderRadius: 8, paddingHorizontal: 10 }}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Button
        title={loading ? 'Creating Account...' : 'Sign Up'}
        onPress={handleSignup}
        disabled={loading}
      />

      <Text style={{ textAlign: 'center', marginTop: 15, color: '#555' }}>
        Already have an account?{' '}
        <Text
          style={{ color: '#007BFF', fontWeight: 'bold' }}
          onPress={() => navigation.navigate('Login')}
        >
          Log In
        </Text>
      </Text>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   text: {
//     textAlign: 'center',
//     marginTop: 15,
//     color: '#555',
//   },
//   link: {
//     color: '#007BFF',
//     fontWeight: 'bold',
//   },
// });


// const App = () => {
//   return (
//      <NavigationContainer>
//           <NativeStack.Navigator initialRouteName="Welcome">
//               <NativeStack.Screen name="Signup" component={SignupScreen} />
//               <NativeStack.Screen name="Welcome" component={WelcomeScreen} />
//               <NativeStack.Screen name="Login" component={LoginScreen} />
//               {/* <NativeStack.Screen name="Home" component={HomeScreen} /> */}
//               {/* Add other screens as needed */}
//           </NativeStack.Navigator>
//       </NavigationContainer>
//   );
// };        

export default SignupScreen;


