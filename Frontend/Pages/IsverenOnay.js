import React, { useEffect, useContext, useState } from 'react';
import UserContext from "../Context/UserContext";
import { FontAwesome } from '@expo/vector-icons';
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
    Pressable
} from 'react-native';
export default function IsverenOnay(props) {
    const { userData } = useContext(UserContext);
    const [isler, setIsler] = useState();
    const { navigation } = props;
    const Is = (props) => {
        return <View style={styles.isler}>
            <View style={styles.islerYan}>
                <Text>İşçi : {props.isciAdSoyad}</Text>
                <Text>Bütçe : {props.butce} <FontAwesome name="turkish-lira" size={14} color="black" /></Text>
                <Text>Bitiş Tarihi : {props.bitisTarihi}</Text>
                <Text>İş Tanımı : {props.isTanimi}</Text>
            </View>
            <View style={styles.status}>
                <Text style={styles.textBekliyor}>Onayınız Bekleniyor</Text>
            </View>
        </View>
    }
    const onayaGit = (item) =>{
        navigation.navigate('SonOnaySayfasi',{bildirimID : item})
    }
    const Isler = () => {
        useEffect(() => {
            const id = userData.user._id;
            axios.post("http://192.168.1.3:5000/IsverenIsGetir", { id }).then(json => setIsler(json.data));

        }, [])
        if (isler) {
            return <View>
                {isler.Onaydakiİsler.map(item => (
                    <TouchableOpacity key={item._id} onPress={()=>onayaGit(item._id)}>
                        <Is
                            key={item._id}
                            isciAdSoyad={item.isciAdSoyad}
                            butce={item.butce}
                            bitisTarihi={item.bitisTarihi}
                            isTanimi={item.isTanimi}
                        />
                    </TouchableOpacity>
                ))

                }

            </View>
        }
        else {
            return <ActivityIndicator size="large" color="#00ff00" />
        }

    }
    return (
        <View>
            <Isler />
        </View>
    )
}
const styles = StyleSheet.create({
    genel: {
        margin: 12
    },
    isler: {
        padding: 5,
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#D4EDDA',
    },
    islerYan: {
        width: 200,
        backgroundColor: '#D4EDDA',
        flexDirection: 'column'
    },
    opsiyon: {
        flexDirection: 'row',

    },
    ustKisim: {
        flexDirection: 'row'
    },
    status: {
        marginTop: 30,
        marginLeft: 5
    },
    deneme: {
        flexDirection: 'column',
        marginTop: 35,
        marginLeft: 45,
    },
    isSayisi: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    sayi: {
        fontSize: 17.5,
        marginTop: 10,
        marginLeft: 40
    },
    textBekliyor: {
        color: "orange"
    },
    textKabul: {
        color: '#D4EDDA'
    },
    textRed: {
        color: 'red'
    },
    content: {
        flexDirection: 'row',
        width: 320,
        marginLeft: 15,
        marginTop: 25
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 45,
    },
    bildirim: {
        fontSize: 12,
        width: 180,
        marginLeft: 10,
        marginTop: 7.5
    },
    zaman: {
        color: 'gray'
    },
    buton: {
        marginTop: 10,
        backgroundColor: '#0095F6',
        height: 40,
        width: 50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    onaySayi: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    butonText: {
        color: 'white',
        fontSize: 12
    },
    kapat: {
        marginTop: 20,
        marginLeft: 5
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        marginLeft: 20,
    },
    card: {
        flex: 1,
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: "white",
        flexBasis: '15%',
        padding: 10,
        flexDirection: 'row',

    },
    cardContent: {
        marginLeft: 20,
    },
    imageAlt: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#cc6699',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 11,

        color: "black",
        fontWeight: 'bold'
    },
    onaylaYoksay: {
        fontSize: 9,
        color: 'gray',
        marginTop: 10
    }

});
