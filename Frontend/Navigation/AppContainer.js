import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register'
import SifremiUnuttum from '../Pages/SifremiUnuttum'
import KodGir from '../Pages/KodGir'
import SifreYenile from '../Pages/SifreYenile'
import Notifi from '../Pages/Notifi'

const Stack = createStackNavigator();

const AppNavigationContainer = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SifremiUnuttum" component={SifremiUnuttum} />
        <Stack.Screen name="KodGir" component={KodGir} />
        <Stack.Screen name="SifreYenile" component={SifreYenile} />
        <Stack.Screen name="Notifi" component={Notifi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;



/* <Tab.Navigator initialRouteName="Home">
        
        <Tab.Screen name="Login" component={Login} style={{}} />
        <Tab.Screen name="Register" component={Register} />
      </Tab.Navigator> */