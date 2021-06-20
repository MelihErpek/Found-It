import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import axios from 'axios';

const ErrorNotice = (props) => {
 
  return (
    <View><Text style={styles.text}>{props.message}</Text></View>
  );
};

const styles = StyleSheet.create({
  text : {
    color :'#660033',
    fontWeight:'bold',
    marginBottom:25 
  }
});


export default ErrorNotice;