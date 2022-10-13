import {LogBox} from 'react-native';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
//import {Input, Box, Center, NativeBaseProvider, View} from 'native-base';
import SelectDropdown from 'react-native-select-dropdown';
import Register from './screens/Register';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Main/Home';
import ItemsProvider from './utils/ItemsProvider';
//import {View} from 'native-base';

const Stack = createStackNavigator();
const Example = () => {
  return (
    <ItemsProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0080ff',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemsProvider>
  );
};

export default Example;
