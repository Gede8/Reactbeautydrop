import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';

import ProfileScreen from './screens/ProfileScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CartContext from './screens/CartContext';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderTracking from './screens/OrderTracking';
import DeliveryScheduling from './screens/DeliveryScheduling';
import SignupScreen from './screens/SignupScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ProductListScreen from './screens/ProductListScreen';
import Logout from './screens/Logout';
import Search from './screens/Search';

export {

    WelcomeScreen,
    
    LoginScreen,
    Logout,
    ProductScreen,
    CartScreen,
    CartContext,
    CheckoutScreen,
    OrderTracking,
    DeliveryScheduling,
    SignupScreen,
    PaymentScreen,
    ProductDetailsScreen,
    ProductListScreen,
    ProfileScreen,
    Search,

}
export default function App() {
    return (
      <NavigationContainer>{
        
        
        
        /* Rest of your app code */}</NavigationContainer>
    );
  }
