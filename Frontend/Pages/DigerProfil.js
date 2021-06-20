import React, { useEffect, useState,useContext } from 'react'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import UserContext from "../Context/UserContext";
import axios from 'axios'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    Pressable,
    TextInput,
    Button,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
    ScrollView
} from 'react-native';

export default function DigerProfil(params) {
    const [data, setData] = useState();
    const { userData } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const { navigation } = params;
    
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
                        <Text style={styles.modalText}>İş Teklifi Gönderildi.</Text>
                        <Text style={styles.modalText}>Ana Sayfaya Yönlendiriliyorsunuz.</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => navigation.navigate("Ana Sayfa")}
                        >
                            <Text style={styles.textStyle}>Kapat</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    }
    const Profil = () => {
        const id = params.route.params.id;
        const gonderenKisiId = userData.user._id;
        useEffect(() => {
            console.log(modalVisible)
            if(!data)
            {
                 axios.post("http://192.168.1.3:5000/ProfilBul", { id }).then(json => setData(json.data.user));
            }
        }, [])
        const isTeklifEt = async () =>{
            /*await axios.post("http://192.168.1.3:5000/isTeklifEt", { id,gonderenKisiId });
            setModalVisible(true)*/
            const gonderilenAdSoyad = data.AdSoyad;
            navigation.navigate('TeklifSayfasi',{ id,gonderenKisiId,gonderilenAdSoyad });
        }
        if (data) {
            return <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.image} source={require('../Images/white.jpg')} />
                </View>
                <Image style={styles.avatar} source={{ uri: data.Fotograf }} />

                <View style={styles.headerPart}>
                    <View style={styles.headerContent}>
                        <Text style={styles.name}>{data.AdSoyad}</Text>
                        <Text style={styles.info}>{data.Meslek}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>

                        <Entypo name="mail" size={22} color="black" />

                        <Text style={styles.mail}>{data.Mail}</Text>
                    </View>
                    <View style={styles.bodyContent}>
                        <Text style={styles.ucret}>Saatlik Ücret:</Text>
                        <Text style={styles.ucret}>100</Text>
                        <FontAwesome name="turkish-lira" size={18} color="black" />
                    </View>
                </View>

                <Text style={styles.description}>{data.Bio}</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={isTeklifEt}>
                    <Text style={styles.teklif}>İş Teklif Et</Text>
                </TouchableOpacity>
                
            </View>
        }
        else {
            return <ActivityIndicator size="large" color="#00ff00" />
        }
    }

    return (
        <View>
            <Profil />
            <Popup/>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#5bc238",
        height: 150,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        marginLeft: 20,
        position: 'absolute',
        marginTop: 135
    },
    image: {
        height: 200,
        resizeMode: "cover",
        justifyContent: "center"
    },

    headerPart: {
        position: 'absolute',
    },
    headerContent: {
        padding: 10,
    },

    body: {
        marginTop: 60,
        marginLeft: 20,
    },
    bodyContent: {
        flexDirection: 'row',
        marginLeft: 120
    },
    name: {
        fontSize: 20,
        color: "#fff",

    },

    info: {
        marginTop: 10,
        fontSize: 12,
        color: '#fff',

    },
    mail: {
        padding: 5,
        fontSize: 10,
        color: 'black',
        textAlign: 'center',
    },
    ucret: {

        fontSize: 13,
        color: 'black',
        textAlign: 'center',
    },
    teklif: {

        fontSize: 13,
        color: 'white',
        textAlign: 'center',
    },
    description: {
        fontSize: 10,
        color: "black",
        marginTop: 25,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 200,
        marginLeft:50,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "black",
        

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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#5bc238",
    },
    textStyle: {
        color: "#003f5c",
        fontWeight: "bold",
        textAlign: "center"
    },
});

