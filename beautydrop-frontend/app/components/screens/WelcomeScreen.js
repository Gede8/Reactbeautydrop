import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, } from '@react-navigation/native';


// import SignupScreen  from  "../../../app/Navigation/Navigation";



function WelcomeScreen () {
  const navigation = useNavigation();

 
  return (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Welcome to BeautyDrop</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}>
      
      </Button>

      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Signup')}>
        
      </Button>
      
    </View>
  );

}
 


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//    },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });


// const App = () => {
//   return (
// <NavigationContainer>
//             <Stack.Navigator initialRouteName="Home">
//                 <Stack.Screen name="Login" component={LoginScreen} />
//               <Stack.Screen name="Signup" component={SignupScreen}/>
//                 {/* Add other screens as needed */}
//             </Stack.Navigator>
//         </NavigationContainer>
//   );
// };

export default WelcomeScreen;