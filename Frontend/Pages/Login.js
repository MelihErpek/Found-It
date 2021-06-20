import React, { useState, useContext } from 'react';
import ErrorNotice from "../Misc/ErrorNotice"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from "expo-status-bar";
import UserContext from "../Context/UserContext";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable
} from 'react-native';
import axios from 'axios';

const Login = (props) => {

  const [Sifre, SetSifre] = useState();
  const [Mail, setMail] = useState();
  const [error, setError] = useState();
  const { navigation } = props;
  const { userData, setUserData } = useContext(UserContext);
  const login = async () => {
    try {
      const user = { Sifre, Mail };
      const res = await axios.post("http://192.168.1.3:5000/Login", user);
      AsyncStorage.setItem('token', res.data.token);
      AsyncStorage.setItem('ıd', res.data.user._id);
      setUserData({

        user: res.data.user
      })

    }
    catch (err) { setError(err.response.data.hata) }
  }
  const unuttum = () => {
    navigation.navigate('SifremiUnuttum')
  }
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-50}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

      <ImageBackground style={styles.image} source={require('../Images/ny.jpeg')}>



        {error && (
          <ErrorNotice message={error} />
        )}

        <TextInput
          style={styles.TextInput}
          placeholder="Mail"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setMail(email)}
        />




        <TextInput
          style={styles.TextInput}
          placeholder="Şifre"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => SetSifre(password)}
        />





        <TouchableOpacity style={styles.loginBtn} onPress={login}>
          <Text style={{ color: "white" }} >Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sifremiUnuttum} onPress={unuttum} >
          <Text style={styles.unuttum}>Şifremi Unuttum</Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center'
  },

  unuttum: {

    color: 'white',

  },

  TextInput: {
    height: 50,

    padding: 10,


    backgroundColor: "#5bc238",
    borderRadius: 30,
    width: "70%",
    justifyContent: "center",
    marginBottom: 20,
    alignItems: "center",



  },



  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#5bc238",

  },
  sifremiUnuttum: {
    width: "40%",
    borderRadius: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#5bc238",

  },
});


export default Login;

/*

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground
} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <ImageBackground  style={styles.image} source={require('./Images/ny.jpeg')}>



      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"



  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    marginLeft:50
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 0,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color:'#cc6699',
    marginLeft:120,

  },

  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#cc6699",
    marginLeft:50
  },
});

*/