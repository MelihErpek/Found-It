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
    TouchableOpacity,
    Alert,
    Modal,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    ImageBackground
} from 'react-native';
import axios from 'axios';

export default function SifremiUnuttum(props) {
    const [Sifre, setSifre] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState();
   
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
                        <Text style={styles.modalText}>Şifreniz Değiştirilmiştir.</Text>
                        <Text style={styles.modalText}>Giriş Sayfasına Yönlendiriliyorsunuz.</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.textStyle}>Kapat</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    }
    
    const login = async () => {
        try {
            const Mail = props.route.params.Mail;
            const user = {  Sifre  , Mail};
            await axios.post("http://192.168.1.3:5000/SifreYenile", user);
            setModalVisible(true);
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
                    placeholder="Şifrenizi Giriniz"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(email) => setSifre(email)}
                />



                
               




                <TouchableOpacity style={styles.loginBtn} onPress={login}>
                    <Text style={{ color: "white" }} >Şifre Yenile</Text>
                </TouchableOpacity>
                {modalVisible == true ? (<Popup/>):(<View></View>)}
                
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
    textStyle: {
        color: "#003f5c",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
  
});
