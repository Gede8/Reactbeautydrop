// navigation/Navigation.js
import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/screens/firebaseConfig';

import app from '../components/screens/firebaseConfig';



import WelcomeScreen  from '../components/screens/WelcomeScreen';
import LoginScreen from '../components/screens/LoginScreen';
import HomeScreen from '../(tabs)/HomeScreen';
import CheckoutScreen from '../components/screens/CheckoutScreen';
import CartScreen from '../components/screens/CartScreen';
import ProductScreen from '../components/screens/ProductScreen';
import SignupScreen from '../components/screens/SignupScreen';
import DeliveryScheduling from '../components/screens/DeliveryScheduling';
import OrderTracking from '../components/screens/OrderTracking';
import PaymentScreen from "../components/screens/PaymentScreen";
import ProfileScreen from '../components/screens/ProfileScreen';
import ProductListScreen from '../components/screens/ProductListScreen';
import CartContext from '../components/screens/CartContext';
import ProductDetailsScreen from '../components/screens/ProductDetailsScreen';
import Logout from '../components/screens/Logout';


const Stack = createStackNavigator();
const Navigation = () => {
  return (
 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
       
        <Stack.Screen name="DeliveryScheduling" component={DeliveryScheduling} />
        <Stack.Screen name="OrderTracking" component={OrderTracking} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
       
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="CartContext" component={CartContext} />


      </Stack.Navigator>
    </NavigationContainer>


  );
};



export default Navigation;
