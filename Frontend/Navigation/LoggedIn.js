import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from '../Pages/Deneme';
import DigerProfil from '../Pages/DigerProfil';
import ProfilDuzenle from '../Pages/ProfilDuzenle';
import HomeLI from '../Pages/HomeLI';
import Bildirimler from '../Pages/Bildirimler';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Kategori from '../Pages/Kategori';
import TeklifSayfasi from '../Pages/TeklifSayfasi';
import İsKabulSayfasi from '../Pages/İsKabulSayfasi';
import IsverenOnay from '../Pages/IsverenOnay';
import İslerim from '../Pages/İslerim';
import SonOnaySayfasi from '../Pages/SonOnaySayfasi';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Ana Sayfa" tabBarOptions={{ activeTintColor: '#cc6699', }} >
      <Stack.Screen name="Ana Sayfa" component={HomeLI} options={{
        tabBarIcon: () => (
          <Entypo name="home" size={24} color="black" />
        ),
      }} />
      <Stack.Screen name="Bildirimler" component={Bildirimler} options={{
        tabBarIcon: () => (
          <Ionicons name="notifications-sharp" size={24} color="black" />
        ),
      }} />
      <Stack.Screen name="İşlerim" component={İslerim} options={{
        tabBarIcon: () => (
          <MaterialIcons name="format-list-bulleted" size={24} color="black" />
        ),
      }} />
      <Stack.Screen name="Profil" component={Profil} options={{
        tabBarIcon: () => (
          <Ionicons name="person-circle-sharp" size={24} color="black" />
        ),
      }} />
      
    </Tab.Navigator>)

}

const AppNavigationContainer = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Deneme" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="ProfilDuzenle" component={ProfilDuzenle} />
        <Stack.Screen name="DigerProfil" component={DigerProfil} />
        <Stack.Screen name="Kategori" component={Kategori} />
        <Stack.Screen name="TeklifSayfasi" component={TeklifSayfasi} />
        <Stack.Screen name="İsKabulSayfasi" component={İsKabulSayfasi} />
        <Stack.Screen name="IsverenOnay" component={IsverenOnay} />
        <Stack.Screen name="SonOnaySayfasi" component={SonOnaySayfasi} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigationContainer;