import React, { useState, useEffect } from 'react';
import ErrorNotice from "../Misc/ErrorNotice"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Pressable,
  Alert,
  ImageBackground,
  DeviceEventEmitter,
  KeyboardAvoidingView
} from 'react-native';
import axios from 'axios';

const Register = (props) => {
  const [AdSoyad, setAdSoyad] = useState();
  const [Sifre, SetSifre] = useState();
  const [Mail, setMail] = useState();
  const [Error, setError] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const { navigation } = props;
  const Popup = () => {

    return <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Kayıt İşlemi Başarılı.</Text>
            <Text style={styles.modalText}>Giriş Ekranına Yönlendiriliyorsunuz.</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {navigation.navigate("Login"),setModalVisible(false)}}
            >
              <Text style={styles.textStyle}>Kapat</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  }
  const register = async () => {

    try {
      const user = { AdSoyad, Sifre, Mail, image };
      await axios.post("http://192.168.1.3:5000/Register", user);
      setModalVisible(true);
    }
    catch (err) { setError(err.response.data.hata) }
    
  }
  const foto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
    console.log(result);
  }
  const deneme = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('ıd');

  }
  useEffect(() => {
    deneme();
  }, [])
  return (
    
    <KeyboardAvoidingView
      keyboardVerticalOffset={-250}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

      <ImageBackground style={styles.image} source={require('../Images/ny.jpeg')}>
        {Error && (
          <ErrorNotice message={Error} />
        )}


        <TextInput
          style={styles.TextInput}
          placeholder="Ad Soyad"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setAdSoyad(email)}
        />


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
        <View style={styles.deneme}>
          <TouchableOpacity style={styles.loginBtn2} onPress={foto}>
            <Text style={styles.loginText}>Fotoğraf Seç</Text>
          </TouchableOpacity>

          {image ? (<>
            <Image style={styles.avatar} source={{ uri: image }} />
          </>) : (<></>)}
        </View>
        


        <TouchableOpacity style={styles.loginBtn} onPress={register}>
          <Text style={styles.loginText}>Kayıt Ol</Text>
        </TouchableOpacity>
        {modalVisible == true ? (<Popup/>):(<View></View>)}
        
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    marginLeft: 120,
    position: 'absolute',

  },
  deneme: {
    flexDirection: "row"
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
  loginBtn2: {
    width: 100,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#5bc238",
    marginRight: 150
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
  loginText: {
    fontWeight: 'bold',
    color: '#ded3d3'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#5bc238",
  },
});


export default Register;

/*

import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

export default class SignUp extends React.Component {
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    try {
      // here place your signup logic
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <Button
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

*/