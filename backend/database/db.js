const mongoose = require("mongoose");

const uri = "mongodb+srv://emrekeskiner:cYqOAuL1nFepEbhp@eticaretdb.cjsqf.mongodb.net/?retryWrites=true&w=majority&appName=EticaretDb";

const connection = ()=>{
    mongoose.connect(uri,{
       /*  useNewUrlParser:true, */
        /* useUnifiedTopology:true */
    }).then(
        ()=> console.log("MongoDb bağlantısı başarılı"))
    .catch(
        (err)=> console.log("Bağlantı hatası! hata : "+err.message));
}

module.exports = connection;