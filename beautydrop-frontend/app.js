
import React, { useState, useEffect } from 'react';

// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer } from '@react-navigation/native';

import { CartProvider } from './app/components/screens/CartContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';




import HomeScreen from './app/(tabs)/HomeScreen';
import CartScreen from './app/components/screens/CartScreen';
import ProductScreen from './app/components/screens/ProductScreen';
import WelcomeScreen from './app/components/screens/WelcomeScreen';
import LoginScreen from './app/components/screens/LoginScreen';
import  SignupScreen from './app/components/screens/SignupScreen';
import  ProductDetailsScreen from "./app/components/screens/ProductDetailsScreen";
import  ProductListScreen from "./app/components/screens/ProductDetailsScreen"; 
import  CheckoutScreen from "./app/components/screens/CheckoutScreen";
import PaymentScreen from "./app/components/screens/PaymentScreen";
import DeliveryScheduling from "./app/components/screens/DeliveryScheduling";
import CartContext from "./app/components/screens/CartContext";
import Logout from "./app/components/screens/Logout";
import WorkerScreen from './app/components/screens/WorkerScreen';
import OrderDetailsScreen from './app/components/screens/OrderDetailsScreen';


// function WelcomeScreen () {
//     return (
//         <View>
//             <Text>Welcome Screen</Text>
//         </View>
//     );
// }
const Stack = createNativeStackNavigator();

function RootStack() {
        return (
        
                <Stack.Navigator>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="ProductScreen" component={ProductScreen} />
                    <Stack.Screen name="CartScreen" component={CartScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="Payment" component={PaymentScreen} />
                    <Stack.Screen name="ProductDetail" component={ProductDetailsScreen} />
                    <Stack.Screen name="Delivery" component={DeliveryScheduling} />
                    <Stack.Screen name="Home" component={CheckoutScreen} />
                    <Stack.Screen name="ProductList" component={ProductListScreen} />
                    <Stack.Screen name="Logout" component={Logout} />
                    
                    <Stack.Screen name="Worker" component={WorkerScreen} />
                    <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />



                    <Stack.Screen name="CartContext" component={CartContext} />


                </Stack.Navigator>
            );
    }

    const App = () => {
        return (
            <CartProvider>
            <NavigationContainer>
              <CartScreen />
              <WelcomeScreen/>
              <CheckoutScreen/>
              <CartContext/>
              <ProductScreen/>
              <Logout/>

              {/* Other components */}
            </NavigationContainer>
          </CartProvider>
        );
      };
export default function App() {
    return (

        <NavigationContainer>
            <RootStack/>

        </NavigationContainer>
        

    );
}
