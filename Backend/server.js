var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
var nodemailer = require("nodemailer")
var cors = require('cors');
var User = require('./Models/User');
let port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 100000000 }));
const url = "mongodb+srv://melihnode:meliherpek1@cluster0.g1oel.mongodb.net/MobileApp?re2tryWrites=true&w=majority";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
},
    (err) => { if (err) { throw err } console.log("Mongoose ile bağlantı kuruldu.") })

app.post("/Register", async (req, res) => {
    const { AdSoyad, Mail, Sifre, image } = req.body;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!AdSoyad || !Mail || !Sifre || !image) {
        res.status(400);
        return res.json({ hata: "Eksik alan bırakmayınız." })
    }
    if (reg.test(Mail) === false) {
        res.status(400);
        return res.json({ hata: "Geçerli Bir Mail Adresi Giriniz." })
    }
    const user = await User.findOne({ Mail: Mail })
    if (user) {
        res.status(400);
        return res.json({ hata: "Bu E-Mail daha önce kullanılmıştır." })
    }
    /*if(Sifre.length <= 6)
    {
        res.status(400);
        return res.json({ hata: "Şifre 6 Karakterden Fazla Olmalıdır." })
    }*/
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(Sifre, salt);
    User.create({
        AdSoyad,
        Mail,
        Sifre: passwordHash,
        Fotograf: image
    })
    var transfer = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "melihnode@gmail.com",
            pass: "meliherpek1"
        }
    });

    var mailInfo = {
        from: "melih.erpek1@ogr.sakarya.edu.tr",
        to: Mail,
        subject: "Found It! ' e Hoşgeldiniz",
        text: "Found It! ' e Hoşgeldiniz",
        html: "<p>Found It! ' e kayıt olduğunuz için teşekkür ederiz.</p>" + "<p>Uygulamamıza giriş yapıp hemen işlerini hallet veya istediğin işi yap !</p>"
    };

    transfer.sendMail(mailInfo, function (err) {
        if (err) { console.log(err); }
        else console.log("gönderildi")
    });
    res.json("okey");
})
app.post("/Login", async (req, res) => {
    const { Mail, Sifre } = req.body;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!Mail || !Sifre) {
        res.status(400);
        return res.json({ hata: "Eksik alan bırakmayınız." })
    }
    if (reg.test(Mail) === false) {
        res.status(400);
        return res.json({ hata: "Geçerli Bir Mail Adresi Giriniz." })
    }
    const user = await User.findOne({ Mail: Mail })
    if (!user) {
        res.status(400);
        return res.json({ hata: "Bu E-Mail ile kayıtlı bir kullanıcı yoktur." })
    }
    const isMatch = await bcrypt.compare(Sifre, user.Sifre);
    if (!isMatch) {
        res.status(400);
        return res.json({ hata: "Şifre Hatalı." })
    }
    const token = jwt.sign({ id: user._id }, 'melih');

    res.json({
        token,
        user
    });
})
app.post("/Auth", async (req, res) => {
    console.log(req.body)
    const user = await User.findById(req.body.idDegeri);
    if (!user) {
        res.status(400);
        return res.json({ hata: "Eksik alan bırakmayınız." })
    }
    res.json({
        user
    })
})
app.post("/ProfilDuzenle", async (req, res) => {

    await User.findByIdAndUpdate(req.body.id, {
        Meslek: req.body.Meslek,
        Kategori: req.body.Kategori,
        Bio: req.body.Hakkimda
    })
    const user = await User.findById(req.body.id);
    res.json({
        user
    })

})
app.get("/ProfilleriGetir", async (req, res) => {
    let user = await User.find({});
    let newUser = [];
    user.map(item => {
        newUser.push({
            _id: item._id,
            AdSoyad: item.AdSoyad,
            Mail: item.Mail,
            Fotograf: item.Fotograf,
            Meslek: item.Meslek,
            Kategori: item.Kategori
        })
    })
    res.json({
        user: newUser,
    })
})
app.post("/ProfilBul", async (req, res) => {
    const id = req.body.id
    const user = await User.findById(id);
    res.json({
        user
    })
})
app.post("/KategoriGetir", async (req, res) => {
    let user = await User.find({ Kategori: req.body.kategoriGetir });
    let newUser = [];
    user.map(item => {
        newUser.push({
            _id: item._id,
            AdSoyad: item.AdSoyad,
            Mail: item.Mail,
            Fotograf: item.Fotograf,
            Meslek: item.Meslek,
            Kategori: item.Kategori
        })
    })
    res.json({
        user: newUser,
    })
})
app.post("/isTeklifEt", async (req, res) => {
    console.log(req.body)

    if (!req.body.text) {
        res.status(400);
        return res.json({ hata: "Eksik alan bırakmayınız." })
    }
    if (req.body.butceAraligi == 0) {
        res.status(400);
        return res.json({ hata: "Eksik alan bırakmayınız." })
    }

    const gonderilenId = req.body.id;
    const gonderen = await User.findById(req.body.gonderenKisiId)
    const user = await User.findByIdAndUpdate(gonderilenId, {
        $push: {
            Bildirimler: {
                Tur: 'Teklif',
                gonderenKisiAdSoyad: gonderen.AdSoyad,
                gonderenID: gonderen._id,
                Fotograf: gonderen.Fotograf,
                Aciklama: req.body.text,
                ButceAraligi: req.body.butceAraligi
            }
        }
    });
    res.json("");
})
app.post("/KabulEt", async (req, res) => {
    console.log(req.body);
    if (!req.body.butce || !req.body.bitisTarihi) {
        res.status(400);
        return res.json({ hata: "Eksik alan bırakmayınız." })
    }
    var reg = new RegExp('^[0-9]+$');
    if (reg.test(req.body.butce) === false) {
        res.status(400);
        return res.json({ hata: "Geçerli Bir Butce Giriniz." })
    }
    const user = await User.findById(req.body.kabulEdenID)

    await User.findByIdAndUpdate(req.body.kabulEdenID, {
        $push: {
            KabulEdilenİsler: {
                kabulEdenID: req.body.kabulEdenID,
                isverenAdSoyad: req.body.isverenAdSoyad,
                butce: req.body.butce,
                bitisTarihi: req.body.bitisTarihi,
                isTanimi: req.body.isTanimi,
                isverenID: req.body.isverenID
            }
        }
    })




    res.json("okey");
})
app.post("/BirSeyYap", async (req, res) => {
    console.log(req.body);
    const user = await User.findById(req.body.kabulEdenID)
    let isciBildirimID;
    isciBildirimID = user.KabulEdilenİsler[user.KabulEdilenİsler.length - 1]._id;

    await User.findByIdAndUpdate(req.body.isverenID, {
        $push: {
            isverenİsOnay: {
                isciAdSoyad: req.body.kabulEdenAdSoyad,
                isciID: req.body.kabulEdenID,
                isciFotograf: user.Fotograf,
                isciAlan: user.Kategori,
                butce: req.body.butce,
                bitisTarihi: req.body.bitisTarihi,
                isTanimi: req.body.isTanimi,
                isciBildirimID
            }
        }
    });

    await User.findByIdAndUpdate(req.body.isverenID, {
        
        $push: {
            Bildirimler: {
                Tur: 'TeklifKabul',
                gonderenKisiAdSoyad: user.AdSoyad,
                gonderenID: user._id,
                Fotograf: user.Fotograf,
            }
        }
    });



    res.json("okey");
})
app.post("/BildirimGetir", async (req, res) => {
    const id = req.body.id;
    const user = await User.findById(id);

    res.json({
        Bildirimler: user.Bildirimler.reverse(),
        Kategori: user.Kategori,
        Key: user._id
    })
})
app.post("/BildirimSil", async (req, res) => {
    await User.findByIdAndUpdate(req.body.userID, {
        $pull: {
            Bildirimler: {
                _id: req.body.BildirimID
            }
        }
    });
    res.json("okey");
})
app.post("/Bilgi", async (req, res) => {

    const user = await User.findById(req.body.userID);
    let is;
    user.Bildirimler.map(item => {
        if (item._id == req.body.BildirimID) {
            is = item;
        }
    })
    res.json({ is });
})
app.post("/IsGetir", async (req, res) => {
    const id = req.body.id;
    const user = await User.findById(id);

    res.json({
        KabulEdilenİsler: user.KabulEdilenİsler.reverse(),
        Kategori: user.Kategori,
        Key: user._id
    })
})
app.post("/IsverenIsGetir", async (req, res) => {
    const id = req.body.id;
    const user = await User.findById(id);

    res.json({
        Onaydakiİsler: user.isverenİsOnay.reverse(),
        Kategori: user.Kategori,
        Key: user._id
    })
})
app.post("/isOnayla", async (req, res) => {
    console.log(req.body)

    const user = await User.findById(req.body.id);
    let is;
    user.isverenİsOnay.map(item => {
        if (item._id == req.body.bildirimID) {
            is = item;
        }
    })
    console.log("is bilgileri", is);
    await User.findByIdAndUpdate(req.body.id, {
        $push: {
            isverenİs: {
                isciAdSoyad: is.isciAdSoyad,
                isciID: is.isciID,
                isciFotograf: is.isciFotograf,
                isciAlan: is.Kategori,
                isTanimi: is.isTanimi,
                butce: is.butce,
                bitisTarihi: is.bitisTarihi,
            }
        }
    });

    await User.findByIdAndUpdate(req.body.id, {
        $pull: {
            isverenİsOnay: {
                _id: req.body.bildirimID
            }
        }
    });
    const isci = await User.findById(is.isciID);

    isci.KabulEdilenİsler.map(item => {
        if (item._id == is.isciBildirimID) {
            item.status = "Kabul Edildi"
        }
    })
    await isci.save();
    await User.findByIdAndUpdate(is.isciID, {
        
        $push: {
            Bildirimler: {
                Tur: 'Onaylandi',
                gonderenKisiAdSoyad: user.AdSoyad,
                gonderenID: user._id,
                Fotograf: user.Fotograf,
            }
        }
    });
    res.json(is);

})

app.get("/deneme", async (req, res) => {
    const id = "60a43ebcfb8cc219a40095c3";
    const bildirim = "60a446d698474227a4631674";
    const user = await User.findById(id);
    let is;
    user.KabulEdilenİsler.map(item => {
        if (item._id == bildirim) {
            item.status = "Onaylandı"
            console.log(item);
        }
    })
    await user.save();

})
app.post("/isReddet", async (req, res) => {
    await User.findByIdAndUpdate(req.body.id, {
        $pull: {
            isverenİsOnay: {
                _id: req.body.bildirimID
            }
        }
    });
    res.json("hello");
})
app.post("/onaylamakIcinIsGetir", async (req, res) => {

    const user = await User.findById(req.body.id);
    let is;
    user.isverenİsOnay.map(item => {
        if (item._id) {
            is = item;
        }
    })
    res.json(is);
})

app.post("/OnayliIs", async (req, res) => {
    const id = req.body.id;
    const user = await User.findById(id);

    res.json({
        Onaydakiİsler: user.isverenİsOnay.reverse(),
        onayliIsler: user.isverenİs.reverse(),
        Key: user._id
    })
})

app.post("/SifremiUnuttum", async (req, res) => {

    const { Mail } = req.body;
    if (!Mail) {
        res.status(400);
        return res.json({ hata: "Mail adresini giriniz." })
    }
    const user = await User.findOne({ Mail: Mail })
    if (!user) {
        res.status(400);
        res.json({ hata: "Bu E-Mail ile kayıtlı bir kullanıcı yoktur." })
    }
    function kodGenerate(length) {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    }
    let kod = kodGenerate(5);
    console.log(kod)
    await User.findOneAndUpdate(Mail, {
        SifremiUnuttumKod: kod
    })
    var transfer = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "melihnode@gmail.com",
            pass: "meliherpek1"
        }
    });

    var mailInfo = {
        from: "melih.erpek1@ogr.sakarya.edu.tr",
        to: Mail,
        subject: "Şifre Yenileme İşlemi Hakkında",
        text: "Şifre İşlemi Hakkında",
        html: "<p>Şifre değiştirmek için kodunuz : " + kod + "</p>"
    };

    transfer.sendMail(mailInfo, function (err) {
        if (err) { console.log(err); }
        else console.log("gönderildi")
    });
    res.json("gönderildi")
})

app.post("/KodGir", async (req, res) => {
    console.log(req.body)
    const { Mail } = req.body;
    const { Kod } = req.body;
    const user = await User.findOne({ Mail });
    if (!Kod) {
        res.status(400);
        res.json({ hata: "Lütfen Kodu Giriniz." })
    }
    if (user.SifremiUnuttumKod == Kod) {
        res.json("şifre doğru");
    }
    else {
        res.status(400);
        res.json({ hata: "Kod Yanlıştır." })
    }

})

app.post("/SifreYenile", async (req, res) => {
    const { Mail, Sifre } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(Sifre, salt);
    await User.findOneAndUpdate(Mail, {
        Sifre: passwordHash
    })
    res.json("okey");
})

app.get("/heroku", async (req, res) => {
    console.log("selam")
    res.send("selamChange");
})

app.listen(port);