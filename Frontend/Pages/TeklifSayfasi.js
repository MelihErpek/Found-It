import React, { useState, useContext } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import UserContext from "../Context/UserContext";
import ErrorNotice from "../Misc/ErrorNotice"
import axios from 'axios'
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
    Pressable
} from 'react-native';
export default function TeklifSayfasi(props) {
    const [text, onChangeText] = useState("");
    const [butceAraligi, setButceAraligi] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const { userData } = useContext(UserContext);
    const { navigation } = props;
    const id = props.route.params.id;
    const gonderenKisiId = userData.user._id;
    const [error, setError] = useState();
    const teklifGonder = async () => {
        try {
            await axios.post("http://192.168.1.3:5000/isTeklifEt", { id, gonderenKisiId, text, butceAraligi });
            console.log("okey");
            setModalVisible(true);
        }
        catch(err) {
            setError(err.response.data.hata)
        }


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


    return (
        <View>
            <Text style={styles.ilkText}>İş Teklifi Gönderilen Kişi : <Text onPress={() => navigation.navigate('DigerProfil', { id: props.route.params.id1 })} style={styles.gonderilenAdSoyad}>{props.route.params.gonderilenAdSoyad}</Text></Text>
            <Text style={styles.ilkText}>İş Açıklaması</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />

            <DropDownPicker
                placeholder="Bütçe Aralığınızı Seçiniz"
                items={[
                    { label: '0-500', value: '0-500', icon: () => <FontAwesome name="turkish-lira" size={18} color="black" /> },
                    { label: '500-1500', value: '500-1500', icon: () => <FontAwesome name="turkish-lira" size={18} color="black" /> },
                    { label: '1500-5000', value: '1500-5000', icon: () => <FontAwesome name="turkish-lira" size={18} color="black" /> },
                    { label: '5000+', value: '5000+', icon: () => <FontAwesome name="turkish-lira" size={18} color="black" /> },
                ]}
                defaultValue={butceAraligi}
                containerStyle={{ height: 40, width: 310 }}
                style={styles.dropdown}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => setButceAraligi(
                    item.value
                )}
            />
            {error && (
                <ErrorNotice style={styles.error} message={error} />
            )}

            <TouchableOpacity style={styles.buton} onPress={teklifGonder} >
                <Text style={styles.butonText}>Teklif Gönder</Text>
            </TouchableOpacity>

            <Popup />
        </View>
    )
}

const styles = StyleSheet.create({
    gonderilenAdSoyad: {
        color: 'black',
        fontWeight: 'bold',
    },
    ilkText: {
        margin: 12
    },
    input: {
        height: 200,
        margin: 12,
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
    butonText: {
        color: 'white',
        fontSize: 12
    },
    dropdown: {
        marginLeft:12,
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
    }

});
