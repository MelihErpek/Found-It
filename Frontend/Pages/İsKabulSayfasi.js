import React, { useContext, useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import UserContext from "../Context/UserContext";
import ErrorNotice from "../Misc/ErrorNotice"
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
    KeyboardAvoidingView
} from 'react-native';
export default function TeklifSayfasi(props) {
    console.log("props", props.route.params.BildirimID)
    const [butce, onChangeText] = useState("");
    const [bitisTarihi, onChangeText2] = useState("");
    const [isBilgileri, setİsBilgileri] = useState();
    const { userData } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleKabul, setModalVisibleKabul] = useState(false);
    const BildirimID = props.route.params.BildirimID;
    const userID = userData.user._id;
    const { navigation } = props;
    const [error, setError] = useState();
    const teklifKabulEt = async (BildirimID) => {
        const kabulEdenID = userData.user._id;
        const kabulEdenAdSoyad = userData.user.AdSoyad;
        const isverenAdSoyad = isBilgileri.gonderenKisiAdSoyad;
        const isverenID = isBilgileri.gonderenID;
        const isTanimi = isBilgileri.Aciklama;
        try {
            await axios.post("http://192.168.1.3:5000/KabulEt", { kabulEdenAdSoyad, kabulEdenID, isverenAdSoyad, isverenID, butce, bitisTarihi, isTanimi });
            await axios.post("http://192.168.1.3:5000/BirSeyYap", { kabulEdenAdSoyad, kabulEdenID, isverenAdSoyad, isverenID, butce, bitisTarihi, isTanimi });
            await axios.post("http://192.168.1.3:5000/BildirimSil", { userID, BildirimID });
            setModalVisibleKabul(true);
        }
        catch(err) {
            setError(err.response.data.hata)
        }

    }
    const teklifReddet = async (BildirimID) => {
        const userID = userData.user._id;
        await axios.post("http://192.168.1.3:5000/BildirimSil", { userID, BildirimID });
        console.log("oldu")
        setModalVisible(true);
    }
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
                        <Text style={styles.modalText}>İş Teklifi Reddedildi.</Text>
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
                        <Text style={styles.modalText}>İş Teklifi Kabul Edildi.</Text>
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
    //const id = props.route.params.id;

    const Teklif = () => {
        useEffect(() => {
            if (!isBilgileri) {
                axios.post("http://192.168.1.3:5000/Bilgi", { userID, BildirimID }).then(item => setİsBilgileri(item.data.is));
            }
        }, [])
        if (isBilgileri) {
            return <View>
                <ScrollView>
                    <Text style={styles.ilkText}>İşveren Ad Soyadı : <Text >{isBilgileri.gonderenKisiAdSoyad}</Text></Text>
                    <Text style={styles.ilkText}>İş Açıklaması</Text>
                    <Text style={styles.input}>
                        {isBilgileri.Aciklama}
                    </Text>
                    <Text style={styles.ilkText}>İşveren Bütçe Aralığı</Text>
                    <Text style={styles.input}>
                        {isBilgileri.ButceAraligi} <FontAwesome name="turkish-lira" size={14} color="black" />
                    </Text>


                </ScrollView>
            </View>

        }
        else {
            return <ActivityIndicator size="large" color="#00ff00" />
        }
    }
    return (
        <View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            ></KeyboardAvoidingView>
            <Teklif />
            <Text style={styles.ilkText}>Bu İşi Ne Kadara Yapacaksın?</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={butce}
            />
            <Text style={styles.ilkText}>Bu İşi Hangi Tarihe Kadar Bitireceksin?</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                value={bitisTarihi}
            />
            <Text style={styles.uyarı}>* Teklifi Kabul Ettiğiniz Takdirde İşverenin Onayına Gidecektir. *</Text>
            {error && (
                <ErrorNotice style={styles.error} message={error} />
            )}
            <View style={styles.butonAyarla}>
                <TouchableOpacity style={styles.buton} onPress={() => teklifKabulEt(isBilgileri._id)}  >
                    <Text style={styles.butonText}>Teklifi Kabul Et</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buton2} onPress={() => teklifReddet(isBilgileri._id)} >
                    <Text style={styles.butonText}>Teklifi Reddet</Text>
                </TouchableOpacity>
            </View>
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
