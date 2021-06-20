import React, { useState, useContext } from 'react';
import ErrorNotice from "../Misc/ErrorNotice"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from "expo-status-bar";


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

export default function SifremiUnuttum(props) {
    const [Mail, setMail] = useState();
    const [error, setError] = useState();
   
    const { navigation } = props;
    
    const login = async () => {
        try {
            
            const user = {  Mail  };
            await axios.post("http://192.168.1.3:5000/SifremiUnuttum", user);
            navigation.navigate('KodGir',{Mail:Mail});
        }
        catch (err) { setError(err.response.data.hata) }
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









                <TouchableOpacity style={styles.loginBtn} onPress={login}>
                    <Text style={{ color: "white" }} >Kod Gönder</Text>
                </TouchableOpacity>

                
            </ImageBackground>
        </KeyboardAvoidingView>

    );
}
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
  
});
