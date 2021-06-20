import React, { useState, useContext } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { StatusBar } from "expo-status-bar";

import UserContext from "../Context/UserContext";
import axios from "axios";
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
    KeyboardAvoidingView
} from 'react-native';


const Login = (props) => {
    const [Hakkimda, setHakkimda] = useState();
    const [Meslek, setMeslek] = useState();
    const [Kategori, setKategori] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { userData, setUserData } = useContext(UserContext);


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
                        <Text style={styles.modalText}>Değişikler Kaydedilmiştir.</Text>
                        <Text style={styles.modalText}>Profil Sayfasına Yönlendiriliyorsunuz.</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => navigation.navigate("Profil")}
                        >
                            <Text style={styles.textStyle}>Kapat</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    }

    const kaydet = async () => {
        const id = userData.user._id;
        const user = await axios.post("http://192.168.1.3:5000/ProfilDuzenle", { id, Meslek, Kategori, Hakkimda });
        setUserData({

            user: user.data.user
        })

        setModalVisible(true);
    }

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={100}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >

            <ScrollView>
                <View style={styles.body}>
                    <StatusBar style="light" />
                    <View style={styles.bodyContent}>

                        <Text style={styles.description}>Kategori</Text>
                        <View style={styles.content}>
                            <DropDownPicker
                                placeholder="Hangi Meslek Grubundasın?"
                                items={[
                                    { label: 'Yazılım', value: 'Yazılım', icon: () => <FontAwesome name="mobile-phone" size={18} color="#900" /> },
                                    { label: 'Temizlik', value: 'Temizlik', icon: () => <MaterialIcons name="cleaning-services" size={18} color="#900" /> },
                                    { label: 'Nakliyat', value: 'Nakliyat', icon: () => <MaterialIcons name="emoji-transportation" size={18} color="#900" /> },
                                ]}
                                defaultValue={Kategori}
                                containerStyle={{ height: 40, width: 310 }}
                                style={styles.dropdown}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => setKategori(
                                    item.value
                                )}
                            />
                        </View>
                        <Text style={styles.description}>Hakkımda</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Biyografi"
                            placeholderTextColor="#003f5c"
                            onChangeText={(password) => setHakkimda(password)}
                        />
                        <Text style={styles.description}>Meslek</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Meslek"
                            placeholderTextColor="#003f5c"
                            onChangeText={(password) => setMeslek(password)}
                        />
                        <Popup />

                        <TouchableOpacity style={styles.buttonContainer} onPress={kaydet}>
                            <Text>Kaydet</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    dropdown: {

        marginLeft: 18.5
    },
    content: {
        flexDirection: 'row',

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


export default Login;

/*
<View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: userData.user.Fotograf }}  />
*/