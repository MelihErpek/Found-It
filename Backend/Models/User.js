const { stringify } = require('json-buffer');
var mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({

    AdSoyad:{
        type:String
    },
    Mail:{
        type:String
    },
    Sifre:{
        type:String
    },
    Fotograf:{
        type:String
    },
    Bio:{
        type:String
    },
    Meslek:{
        type:String
    },
    Kategori:{
        type:String
    },
    SifremiUnuttumKod:{
        type:String
    },
    Bildirimler:[{
        Tur:{type:String},
        gonderenID:{type:String},
        gonderenKisiAdSoyad:{type:String},
        Fotograf:{type:String},
        Tarih:{type:Date,default:Date.now},
        Aciklama:{type:String},
        ButceAraligi:{type:String}
    }],
    KabulEdilenİsler:[{
        isverenAdSoyad:{type:String},
        isverenID:{type:String},
        isTanimi:{type:String},
        butce:{type:String},
        bitisTarihi:{type:String},
        status:{type:String,default:'Onay Bekleniyor'}
    }],
    isverenİsOnay:[{
        isciAdSoyad:{type:String},
        isciID:{type:String},
        isciFotograf:{type:String},
        isciAlan:{type:String},
        isTanimi:{type:String},
        butce:{type:String},
        bitisTarihi:{type:String},
        isciBildirimID:{type:String}
    }],
    isverenİs:[{
        isciAdSoyad:{type:String},
        isciID:{type:String},
        isciFotograf:{type:String},
        isciAlan:{type:String},
        isTanimi:{type:String},
        butce:{type:String},
        bitisTarihi:{type:String},
    }]

})
const User = mongoose.model('User',userSchema)

module.exports = User;