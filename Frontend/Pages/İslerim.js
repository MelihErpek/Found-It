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
export default function İslerim(props) {
    const [data, setData] = useState();
    const [isverenİsOnay, setİsverenİsOnay] = useState();
    const [onayliIS, setOnayliIs] = useState();
    const [sekme, setSekme] = useState("isci");
    const { userData } = useContext(UserContext);
    const { navigation } = props;

    const Isler = (props) => {
        return <View style={styles.isler}>
            <View style={styles.islerYan}>
                <Text style={{ fontSize: 12 }}>İşveren : {props.isverenAdSoyad}</Text>
                <Text style={{ fontSize: 12 }}>Bütçe : {props.butce} <FontAwesome name="turkish-lira" size={14} color="black" /></Text>
                <Text style={{ fontSize: 12 }}>Bitiş Tarihi : {props.bitisTarihi}</Text>
                <Text style={{ fontSize: 12 }}>İş Tanımı : {props.isTanimi}</Text>
            </View>
            <View style={styles.status}>
                {props.status == "Onay Bekleniyor" ? (<Text ><Text style={styles.textBekliyor}>{props.status}</Text></Text>) : (<Text></Text>)}
                {props.status == "Kabul Edildi" ? (<Text style={styles.textKabul}> {props.status}</Text>) : (<Text></Text>)}
                {props.status == "Reddedildi" ? (<Text style={styles.textRed}> {props.status}</Text>) : (<Text></Text>)}
            </View>
        </View>
    }
    const Islerİsveren = (props) => {
        return <View style={styles.islerİsveren}>
            <View style={styles.islerYanİsveren}>
                <View style={styles.yanYaz}>
                    <Image style={styles.image} source={{ uri: props.Fotograf }} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.yaziAdSoyad}>{props.isverenAdSoyad}</Text>
                        <Text style={styles.yaziAdSoyad}>{props.Kategori}</Text>
                    </View>
                </View>
                <Text style={styles.yazi}>Bütçe : {props.butce} <FontAwesome name="turkish-lira" size={10} color="black" /></Text>
                <Text style={styles.yazi}>Bitiş Tarihi : {props.bitisTarihi}</Text>
                <Text style={styles.yazi}>İş Tanımı : {props.isTanimi}</Text>
            </View>
            <View style={styles.statusİsveren}>

                <Text style={styles.textKabul}>Onayladınız</Text>

            </View>
        </View>
    }
    const isci = () => {
        setSekme("isci")
    }
    const isveren = () => {
        setSekme("isveren")
    }
    const onay = () => {
        navigation.navigate('IsverenOnay')
        //navigation.navigate('IsverenOnay', { kategori: kategori })
    }
    const IsGetir = () => {
        if (sekme == "isci") {
            useEffect(() => {
                const id = userData.user._id;
                axios.post("http://192.168.1.3:5000/IsGetir", { id }).then(json => setData(json.data));
            }, [])
            if (data) {
                if (data.KabulEdilenİsler.length === 0) {

                    return <View style={styles.ustKisim}><Image style={styles.avatar} source={{ uri: userData.user.Fotograf }} />
                        <View style={styles.deneme}>
                            <Text style={styles.isSayisi}>İş Sayınız </Text>
                            <Text style={styles.sayi}>{data.KabulEdilenİsler.length}</Text>
                        </View>
                    </View>
                }
                else {

                    return <View>

                        <View style={styles.ustKisim}><Image style={styles.avatar} source={{ uri: userData.user.Fotograf }} />
                            <View style={styles.deneme}>
                                <Text style={styles.isSayisi}>İş Sayınız </Text>
                                <Text style={styles.sayi}>{data.KabulEdilenİsler.length}</Text>
                            </View>
                        </View>
                        {data.KabulEdilenİsler.map(item => (
                            <Isler
                                key={item._id}
                                status={item.status}
                                isverenAdSoyad={item.isverenAdSoyad}
                                butce={item.butce}
                                bitisTarihi={item.bitisTarihi}
                                isTanimi={item.isTanimi}
                            />))}
                    </View>



                }
            }
            else {
                return <ActivityIndicator size="large" color="#00ff00" />
            }
        }
        else {
            useEffect(() => {
                const id = userData.user._id;
                if (!onayliIS) {
                    axios.post("http://192.168.1.3:5000/OnayliIs", { id }).then(json => setOnayliIs(json.data));
                    axios.post("http://192.168.1.3:5000/IsverenIsGetir", { id }).then(json => setİsverenİsOnay(json.data));

                }
            }, [])
            if (onayliIS && isverenİsOnay) {

                return <View>
                    <SafeAreaView >
                        <ScrollView>
                            <View style={styles.ustKisim}><Image style={styles.avatar} source={{ uri: userData.user.Fotograf }} />
                                <View style={styles.deneme}>
                                    <Text style={styles.isSayisi}>İş Sayınız </Text>
                                    <Text style={styles.sayi}>{onayliIS.onayliIsler.length}</Text>
                                </View>
                            </View>


                            {isverenİsOnay.Onaydakiİsler.length >= 1 ? (
                                <TouchableOpacity style={styles.card} onPress={() => onay()}>
                                    <TouchableOpacity style={styles.imageAlt}>
                                        <Text style={styles.onaySayi}>{isverenİsOnay.Onaydakiİsler.length}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.name}>Onayınızı Bekleyen İş Teklifleriniz </Text>
                                        <Text style={styles.onaylaYoksay}>İstekleri Onayla veya Yoksay </Text>
                                    </View>
                                </TouchableOpacity>) : (<><TouchableOpacity style={styles.card} >
                                    <TouchableOpacity style={styles.imageAlt}>
                                        <Text style={styles.onaySayi}>{isverenİsOnay.Onaydakiİsler.length}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.name}>Onayınızı Bekleyen Bir İş Teklifi Yok </Text>
                                    </View>
                                </TouchableOpacity></>
                            )}

                            {onayliIS.onayliIsler.map(item => (<Islerİsveren
                                key={item._id}
                                isverenAdSoyad={item.isciAdSoyad}
                                Fotograf={item.isciFotograf}
                                butce={item.butce}
                                bitisTarihi={item.bitisTarihi}
                                isTanimi={item.isTanimi}
                                Kategori="Yazılım"
                            />))}
                        </ScrollView>
                    </SafeAreaView>
                </View>
            }
            else {
                return <ActivityIndicator size="large" color="#00ff00" />
            }

        }

    }
    return (
        <View style={styles.genel}>
            <View style={styles.opsiyon}>
                <TouchableOpacity onPress={() => setSekme("isci")} style={{ height: 40, width: 150 }}>
                    {sekme == "isci" ? (<Text style={{ fontSize: 20, marginLeft: 30, width: 150, textDecorationLine: 'underline', color: '#cc6699' }} >İşçi Olarak</Text>) : (<Text style={{ fontSize: 20, marginLeft: 30, color: 'black' }} onPress={isci}>İşçi Olarak</Text>)}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSekme("isveren")} style={{ height: 40, width: 190 }}>
                    {sekme == "isveren" ? (<Text style={{ fontSize: 20, marginLeft: 22, width: 190, textDecorationLine: 'underline', color: '#cc6699' }}  >İşveren Olarak</Text>) : (<Text style={{ fontSize: 20, marginLeft: 22, color: 'black' }} onPress={isveren} >İşveren Olarak</Text>)}
                </TouchableOpacity>
            </View>
            <IsGetir />
        </View>

    )
}
const styles = StyleSheet.create({

    genel: {
        margin: 12
    },
    isler: {
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 5,
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#D4EDDA',

        borderRadius: 20
    },
    islerİsveren: {
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 5,
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#D4EDDA',
        backgroundColor: '#D4EDDA',
        borderRadius: 20

    },
    yanYaz: {
        flexDirection: 'row'
    },
    islerYan: {
        width: 170,
        backgroundColor: '#D4EDDA',
        flexDirection: 'column',
        borderRadius: 5
    },
    islerYanİsveren: {
        width: 200,
        backgroundColor: '#D4EDDA',
        flexDirection: 'column',

    },
    yazi: {
        fontSize: 11
    },
    yaziAdSoyad: {
        fontSize: 14,
        marginLeft: 10
    },
    opsiyon: {
        flexDirection: 'row',

    },
    ustKisim: {
        flexDirection: 'row'
    },
    status: {
        marginTop: 30,

    },
    statusİsveren: {
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
        color: "orange",
        fontSize: 12
    },
    textKabul: {
        color: 'green',
        fontSize: 12,
        fontWeight: 'bold'
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
