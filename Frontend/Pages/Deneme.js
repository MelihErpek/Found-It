import React, { useState, useContext } from 'react';

import UserContext from "../Context/UserContext";
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


const Login = (props) => {

  const { userData, setUserData } = useContext(UserContext);
  console.log("profil")

  const { navigation } = props;

  const cikis = async () => {
    try {

      setUserData({
        user:undefined
      })
      
    }
    catch { }
  }
  return (

    <View style={styles.container}>
      {userData.user ? (<>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: userData.user.Fotograf }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            
            <Text style={styles.name}>{userData.user.AdSoyad}</Text>
            <Text style={styles.info}>{userData.user.Meslek}</Text>
            <Text style={styles.description}>{userData.user.Bio}</Text>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ProfilDuzenle')}>
              <Text>Profil Düzenle</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonContainer} onPress={cikis}>
              <Text>Çıkış Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>) : (<><TouchableOpacity style={styles.buttonContainer} onPress={cikis}>
              <Text>Çıkış Yap</Text>
            </TouchableOpacity></>)}

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#5bc238",
    height: 150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 50
  },

  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  name: {
    fontSize: 14,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 12,
    color: '#696969',
    marginTop: 10
  },
  description: {
    fontSize: 10,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#5bc238",

  },
});


export default Login;