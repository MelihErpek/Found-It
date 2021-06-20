import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
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
    SafeAreaView
} from 'react-native';
export default function HomeLI(props) {
    console.log("burası");
    const [kategori, setKategori] = useState('');
    const { navigation } = props;


    const Profil = () => {
        const data = [
            {
                Hizmet: "Yazılım",
                _id: "1",
                Fotograf: require('../Images/software.jpg'),
                Kategori:"Yazılım"
            },
            {
                Hizmet: "Temizlik",
                _id: "2",
                Fotograf: require('../Images/temizlik.jpg'),
                Kategori:"Temizlik"
            },
            {
                Hizmet: "Nakliyat",
                _id: "3",
                Fotograf: require('../Images/nakliyat.jpg'),
                Kategori:'Nakliyat'
            }
        ]
        const ara = async () => {
            navigation.navigate('Kategori', { kategori: kategori })
        }

        if (data) {
            return <View style={styles.container}>
                <View style={styles.workHeader}>
                    <Image style={styles.work} source={require('../Images/work.jpg')} />
                </View>
                <View style={styles.content}>
                    <DropDownPicker
                        placeholder="Hangi Hizmete İhtiyacın Var?"
                        items={[
                            { label: 'Yazılım', value: 'Yazılım', icon: () => <FontAwesome name="mobile-phone" size={18} color="#900" /> },
                            { label: 'Temizlik', value: 'Temizlik', icon: () => <MaterialIcons name="cleaning-services" size={18} color="#900" /> },
                            { label: 'Nakliyat', value: 'Nakliyat', icon: () => <MaterialIcons name="emoji-transportation" size={18} color="#900" /> },
                        ]}
                        defaultValue={kategori}
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
                    <FontAwesome style={styles.logo} name="search" size={24} color="black" onPress={ara} />
                </View>
                <Text style={styles.trend}>Trend Olan Hizmetler</Text>
                <FlatList
                    style={styles.userList}
                    horizontal={true}
                    data={data}
                    keyExtractor={(item) => {
                        return item._id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.card} >
                                <Image style={styles.image} source={item.Fotograf} />
                                <View style={styles.cardContent}>
                                    <Text style={styles.name}>{item.Hizmet}</Text>
                                    <TouchableOpacity style={styles.followButton} onPress={() => navigation.navigate('Kategori', { kategori: item.Kategori })} >
                                        <Text style={styles.followButtonText}>İncele</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        }
        else {
            return <ActivityIndicator size="large" color="#00ff00" />
        }


    }

    return (
        <Profil />
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: "#eeeeee"
    },
    trend: {
        padding: 20,
        fontSize: 20
    },
    workHeader: {

        height: 100,
    },
    work: {
        height: 150,
        resizeMode: "repeat",
        justifyContent: "center"
    },
    dropdown: {
        position: 'absolute',
        marginLeft: 18.5
    },
    content: {
        flexDirection: 'row'
    },
    header: {
        backgroundColor: "#00CED1",
        height: 200
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
        flex: 1,
    },
    detailContent: {
        top: 80,
        height: 500,
        width: Dimensions.get('screen').width - 90,
        marginHorizontal: 30,
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: "#ffffff"
    },
    userList: {
        flex: 1,

    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10,

    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },



    card: {
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
        flexBasis: '46%',
        padding: 10,
        flexDirection: 'row',
        height: 150
    },
    logo: {
        marginLeft: 10,
        marginTop: 7
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#008080",
        fontWeight: 'bold'
    },
    position: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#696969"
    },
    about: {
        marginHorizontal: 10
    },

    followButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    followButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
    },

    popup: {
        backgroundColor: 'white',
        marginTop: 80,
        marginHorizontal: 20,
        borderRadius: 7,
    },
    popupOverlay: {
        backgroundColor: "#00000057",
        flex: 1,
        marginTop: 30
    },
    popupContent: {
        //alignItems: 'center',
        margin: 5,
        height: 250,
    },
    popupHeader: {
        marginBottom: 45
    },
    popupButtons: {
        marginTop: 15,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: "#eee",
        justifyContent: 'center'
    },
    popupButton: {
        flex: 1,
        marginVertical: 16
    },
    btnClose: {
        height: 20,
        backgroundColor: '#20b2aa',
        padding: 20
    },
    modalInfo: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});


/*data.map(item =>
                <View>
                    <Image style={styles.avatar} source={{ uri: item.Fotograf }} />
                    <Text onPress={() => navigation.navigate('DigerProfil', { id: item._id })}>{item.AdSoyad}</Text>
                    <Text>{item.Mail}</Text>

                </View>
            ) */