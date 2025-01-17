import { useState} from 'react';
import { Text  } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  ScrollView, View, SafeAreaView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";



import {
    WelcomeScreen,
    LoginScreen,
    SignupScreen

}
from "../components";

const NativeStack = createNativeStackNavigator();


const App = () => {
    return (
       <NavigationContainer>
            <NativeStack.Navigator initialRouteName="Welcome">
                <NativeStack.Screen name="Signup" component={SignupScreen} />
                <NativeStack.Screen name="Welcome" component={WelcomeScreen} />
                <NativeStack.Screen name="Login" component={LoginScreen} />
                {/* <NativeStack.Screen name="Home" component={HomeScreen} /> */}
                {/* Add other screens as needed */}
            </NativeStack.Navigator>
        </NavigationContainer>
    );
};        

export default App;