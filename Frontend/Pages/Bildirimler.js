import React, { useEffect, useContext, useState } from 'react'
import UserContext from "../Context/UserContext";
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/tr';
import axios from 'axios';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
export default function HomeLI(props) {
    const { userData } = useContext(UserContext);
    const [data, setData] = useState();
    const [isBilgileri,setİsBilgileri] = useState();
    const { navigation } = props;
    moment.locale('tr');
    const tarihHesapla = (bildirimTarihi) => {
        return moment(moment(bildirimTarihi), "YYYYMMDD").fromNow();
    }
    const bildirimSil = async (BildirimID) =>{
        const userID = userData.user._id;
        await axios.post("http://192.168.1.3:5000/BildirimSil", { userID,BildirimID});
    }
    const deneme = async(BildirimID) =>{
        navigation.navigate('İsKabulSayfasi', { BildirimID:BildirimID });
        //await axios.post("http://192.168.1.3:5000/İsBilgisiİncele", { userID,BildirimID}).then(json=>setİsBilgileri(json));
        //console.log(isBilgileri);
    }
    const Bildirim = (props) => {
        return <View style={styles.content}>
            <Image style={styles.image} source={{ uri: props.Fotograf }} />
            <Text style={styles.bildirim}>{props.GonderenKisi} isimli kullanıcı size {props.Kategori} alanında bir iş teklif etti. <Text style={styles.zaman}>{props.Zaman}</Text></Text>
            <TouchableOpacity  style={styles.buton} onPress={()=>deneme(props.BildirimID)} >
                <Text style={styles.butonText}>İncele</Text>
            </TouchableOpacity>
            <MaterialIcons style={styles.kapat }name="close" size={24} color="gray" onPress={()=>bildirimSil(props.BildirimID)} />
        </View>
    }
    const BildirimGoster = () => {
        const id = userData.user._id;
        useEffect(() => {
            axios.post("http://192.168.1.3:5000/BildirimGetir", { id }).then(json => setData(json.data));
        }, [])
        if (data) {
            if (data.Bildirimler.length === 0) {

                return <View><Text>Şu an bir bildiriminiz yoktur.</Text></View>
            }
            else {
                return data.Bildirimler.map(item => (<Bildirim
                    key={item._id}
                    GonderenKisi={item.gonderenKisiAdSoyad}
                    Kategori={data.Kategori}
                    Fotograf={item.Fotograf}
                    Zaman={tarihHesapla(item.Tarih)}
                    BildirimID = {item._id}
                />))

            }
        }
        else {
            return <ActivityIndicator size="large" color="#00ff00" />
        }
    }
    return (
        <View >
            <BildirimGoster />
        </View>
    )
}
const styles = StyleSheet.create({
    
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
    buton:{
        marginTop:10,
        backgroundColor:'#0095F6',
        height:40,
        width:50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:10
    },
    butonText:{
        color:'white',
        fontSize:12
    },
    kapat:{
        marginTop:20,
        marginLeft:5
    }
});