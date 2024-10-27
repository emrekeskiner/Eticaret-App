const express = require("express");
const Category = require("../models/category");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const response = require("../services/response.service");

router.post("/add", async (req,res)=>{

    response(res,async ()=>{
        const {name} = req.body;

        const chaeckName = await Category.findOne({name:name});
        if(chaeckName != null){
            res.status(403).json({message: "Bu kategori adı daha önce kullanılmış"});
        }else{

            const category = new Category({
                _id: uuidv4(),
                name: name
            });
    
            await category.save();
            res.json({message: "Kategori kaydı başarıyla tamamlandı !"});

        }
    });
    
});

router.post("/removeById", async (req,res)=>{

    response(res, async ()=>{

        const {_id} = req.body;
       
        await Category.findByIdAndDelete(_id);
        res.json({message: "Kategori kaydı başarıyla silindi !"});
    });

});

router.post("/updateById", async (req,res)=>{

        response(res, async ()=>{

            const {_id,name} = req.body;
       
            const checkCategory = await Category.findOne({name:name});
            if(checkCategory != null){
            
             res.status(403).json({message: "Kategori adı daha önce kullanılmış !"})
            }else{
     
             const category = await Category.findOne({_id:_id});
             category.name = name;
             await Category.findByIdAndUpdate(_id,category);
             res.json({message: "Kategori kaydı başarıyla güncellendi !"});
            }
        });
    
});

router.get("/", async (req,res)=>{

    response(res, async ()=>{
        const categories = await Category.find().sort({name:1});
        res.json(categories);
    })
   
});

module.exports = router;