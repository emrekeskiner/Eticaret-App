const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,"uploads/")
    },
    filename: function(req,file,callBack){
        callBack(null,Date.now()+ "-"+file.originalname)
    }
});

const upload = multer({storage: storage});

module.exports = upload;