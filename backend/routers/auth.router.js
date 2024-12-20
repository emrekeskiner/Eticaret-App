const express = require("express");
const User = require("../models/user");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");
const response = require("../services/response.service");

const secretKey = "MySecretKey MySecretKey1234.";
const options = {
    expiresIn: "1d"
};

router.post("/register",async(req,res)=>{

    response(res, async ()=>{
        const user = new User(req.body);
        user._id = uuidv4();
        user.createdDate = new Date();
        user.isAdmin = false;

        const checkUserEmail = await User.findOne({email:user.email});
        
        if(checkUserEmail !=null){
            res.status(403).json({message: "Bu mail adresi daha önce kullanılmış !"});
        }else{
             await user.save();
            const token = jwt.sign({},secretKey,options);
            let model = {token:token, user:user};
            res.json(model);
        }
    });
   
});

router.post("/login",async (req,res)=>{

    response(res, async ()=>{
        const {email,password}=req.body; //formdan veriyi aldık

        let user = await User.findOne({email: email});

        if(user == null){
            res.status(403).json({message: "Kullanıcı bulunamadı !"});
        }else{
            if(user.password != password){
                res.status(403).json({message: "Kullanıcı Adı veya Şifre hatalı !"});
            }else{
                const token = jwt.sign({},secretKey,options);
                let model = {token:token,user:user};
                res.json(model);
            }
        }
    });
   
});



module.exports = router;