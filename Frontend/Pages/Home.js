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

export default function App(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('../Images/ny.jpeg')}>
        <StatusBar style="auto" />
        <Text style={styles.ilkSatir}>Today Make Your</Text>
        <Text style={styles.ikinciSatir}>Dream Job!</Text>
        <View style={styles.buton}>
          <TouchableOpacity style={styles.buton2} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText} >Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buton2} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.loginText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  ); cc
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ilkSatir: {

    color: '#5bc238',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: "right",
    marginRight: 25,
  },
  ikinciSatir: {
    flex: 1,
    color: '#5bc238',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 0,
    textAlign: "right",
    marginRight: 25
  },
  buton: {

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 450


  },
  buton2: {

    width: "25%",
    borderRadius: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,

    backgroundColor: "#5bc238",
    marginLeft: 25
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
    marginLeft: 50
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 0,
  },

  forgot_button: {
    height: 30,
    marginBottom: 0,
    color: '#cc6699',
    marginLeft: 120,

  },

  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    backgroundColor: "#cc6699",
    marginLeft: 50
  },
  loginText: {
    fontWeight: 'bold',
    color: '#ded3d3'
  }
});




/*import { StatusBar } from "expo-status-bar";
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

export default function App(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <ImageBackground  style={styles.image} source={require('../Images/ny.jpeg')}>



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
      <Button
        title="Go to Profile2"
        onPress={() => navigation.navigate('Profile')}
      />
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
    marginBottom: 0,
    color:'#cc6699',
    marginLeft:120,

  },

  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    backgroundColor: "#cc6699",
    marginLeft:50
  },
}); */