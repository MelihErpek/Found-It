import React, { useContext, useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import UserContext from "../Context/UserContext";
import axios from 'axios';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    Dimensions,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    Modal,
    Pressable,
    KeyboardAvoidingView,
    
} from 'react-native';
export default function SonOnaySayfasi(props) {
    const [data, setData] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleKabul, setModalVisibleKabul] = useState(false);
    const { userData } = useContext(UserContext);
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
                        <Text style={styles.modalText}>İş Reddettiniz.</Text>
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
    const PopupKabul = () => {
        return <View style={styles.centeredView}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisibleKabul}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisibleKabul(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>İşi Onayladınız.</Text>
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
    const teklifKabulEt = async () => {
        const id = userData.user._id;
        const bildirimID = props.route.params.bildirimID;
        await axios.post("http://192.168.1.3:5000/isOnayla", { id, bildirimID })
        setModalVisibleKabul(true);
    }
    const teklifReddet = async () => {
        const id = userData.user._id;
        const bildirimID = props.route.params.bildirimID;
        await axios.post("http://192.168.1.3:5000/isReddet", { id, bildirimID })
        setModalVisible(true);
    }
    const Onay = () => {
        useEffect(() => {
            if (!data) {
                const id = userData.user._id;
                const bildirimID = props.route.params.bildirimID;
                axios.post("http://192.168.1.3:5000/onaylamakIcinIsGetir", { id, bildirimID }).then(json => setData(json.data));
            }

        }, [])

        if (data) {
            return <View>
                <Text style={styles.ilkText}>İşçi Ad Soyad : <Text >{data.isciAdSoyad}</Text></Text>
                <Text style={styles.ilkText}>İş Açıklaması</Text>
                <Text style={styles.input}>
                    {data.isTanimi}
                </Text>
                <Text style={styles.ilkText}>İşçinin İşi Yapacağı Ücret</Text>
                <Text style={styles.input}>
                    {data.butce} <FontAwesome name="turkish-lira" size={14} color="black" />
                </Text>
                <View style={styles.butonAyarla}>
                    <TouchableOpacity style={styles.buton} onPress={() => teklifKabulEt()}  >
                        <Text style={styles.butonText}>İşi Onayla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buton2} onPress={() => teklifReddet()} >
                        <Text style={styles.butonText}>İşi Reddet</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        else{
            return <ActivityIndicator size="large" color="#00ff00" />
        }

    }
    return (
        <View>
            <Onay />
            <Popup />
            <PopupKabul />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gonderilenAdSoyad: {
        color: 'black',
        fontWeight: 'bold',
    },
    ilkText: {
        margin: 12
    },
    input: {

        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        borderWidth: 0.5,
        borderColor: '#0095F6',
        textAlignVertical: 'top'
    },
    buton: {
        marginTop: 30,
        backgroundColor: '#0095F6',
        height: 40,
        width: 100,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12
    },
    buton2: {
        marginTop: 30,
        backgroundColor: '#DC3545',
        height: 40,
        width: 100,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12
    },
    butonText: {
        color: 'white',
        fontSize: 12
    },
    dropdown: {
        margin: 12,
        position: 'absolute',
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
        backgroundColor: "#0095F6",
    },
    textStyle: {
        color: "#fff",
        textAlign: "center"
    },
    butonAyarla: {
        flexDirection: 'row'
    },
    uyarı: {
        marginTop: 12,
        marginLeft: 12,
        fontSize: 8,
        color: 'red'
    }

});
