const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const Product = require("../models/product");
const fs = require("fs");
const upload = require("../services/file.service");
const response = require("../services/response.service");

//ürün ekleem
router.post("/add",upload.array("images"), async (req,res)=>{

   response(res, async ()=>{
    const {name,stock,price,categories} = req.body;

    // const checkProduct = await Product.findOne({name:product.name});

   
    
       
        const productId = uuidv4();
        let product = new Product({
            _id: productId,
            name: name.toUpperCase(),
            stock: stock,
            price : price,
            categories: categories,
            isActive:true,
            imageUrls: req.files,
            createdDate: new Date()
        });

        await product.save();

        res.json({message: "Ürün kaydı başarıyla tamamlandı !"});

   });

});
// ürün silme 
router.post("/removeById", async (req,res)=>{
    response(res, async ()=>{

        const {_id} = req.body;
        
        const product = await Product.findById(_id);
        for(const image of product.imageUrls){
            fs.unlink(image.path, ()=>{});
        }

        await Product.findByIdAndDelete(_id);

        res.json({message: "Ürün kaydı başarıyla silindi !"});
    });
});


// Ürün Listesi getir

router.post("/", async (req,res)=>{
    response(res, async()=>{
        const {pageNumber, pageSize, search=""}= req.body;
       
        let productCount = await Product.find({
            $or: [
                {
                    name: { $regex: search, $options: 'i'}
                }
            ]
        }).countDocuments();

        let products = await Product
        .find({
            $or:[
                {
                    name: { $regex: search, $options: 'i'}
                }
            ]
        }).sort({name:1})
            .populate("categories")
            .skip((pageNumber -1)* pageSize)
            .limit(pageSize);

            let totalPageCount = Math.ceil(productCount/pageSize);
            let model = {
                datas: products,
                pageNumber : pageNumber,
                pageSize: pageSize,
                totalPageCount: totalPageCount,
                isFirstPage : pageNumber ==1 ? true: false,
                isLastPage: totalPageCount == pageNumber ? true:false

            };

            res.json(model);
    });
});

// Ürünü Id'ye göre getirme 

router.post("/getById", async(req,res)=>{
    response(res, async()=>{
        const {_id}= req.body;
        let product = await Product.findById(_id);
        res.json(product);
    });
});

// Ürünü Güncelleme
router.post("/update", upload.array("images"), async(req,res)=>{
    response(res, async()=>{
        const {_id, name, stock, price, categories} = req.body;

        let product = await Product.findById(_id);

        // for(const image of product.imageUrls){
        //     fs.unlink(image.path, ()=>{});
        // }

        let imageUrls;
        imageUrls = [...product.imageUrls,...req.files]
        product = {
            name: name.toUpperCase(),
            stock: stock,
            price: price,
            imageUrls:imageUrls,
            categories: categories
        };
        await Product.findByIdAndUpdate(_id, product);
        res.json({message: "Ürün kaydı başarıyla güncellendi !"});
    });
});

//Ürün resmi sil

router.post("/removeImageByProductIdAndIndex", async(req, res)=>{
    response(res, async()=>{
        const {_id, index}= req.body;

        let product = await Product.findById(_id);
        if(product.imageUrls.length==1){
            res.status(500).json({message: "Son ürün resmini silemezsiniz! En az 1 ürün resmi bulunmak zorundadır!"});
        }else{
            let image = product.imageUrls[index];
            product.imageUrls.splice(index,1);
            await Product.findByIdAndUpdate(_id, product);
            fs.unlinkSync(image.path, ()=>{});
            res.json({message: "Resim başarıyla kaldırıldı !"});
        }
    });
});

//Ürünün Aktif Pasif Durumunu Değiştir
router.post("/changeActiveStatus", async(req,res)=>{
    response(res, async()=>{
        const {_id} = req.body;
        let product = await Product.findById(_id);
        product.isActive = !product.isActive;
        await Product.findByIdAndUpdate(_id, product);
        res.json({message: "Ürünün durumu başarıyla değiştirildi."});
    });
});

//Anasayfa için ürün listesini getir

router.post("/getAllForHomePage", async(req,res)=>{
    response(res, async()=>{
        const {pageNumber,pageSize,search="",categoryId, priceFilter} = req.body;

        let products;

        if(priceFilter == 0){
            products = await Product.find({
            isActive : true,
            categories: { $regex: categoryId, $options: 'i'},
            $or: [
                {
                    name: {$regex: search, $options: 'i'}
                }
            ]
          })
          .sort({name:1})
          .populate("categories");
        }else{
            
                products = await Product.find({
                isActive : true,
                categories: { $regex: categoryId, $options: 'i'},
                $or: [
                    {
                        name: {$regex: search, $options: 'i'}
                    }
                ]
              })
              .sort({price:Number(priceFilter)})
              .populate("categories");
              
        }

        res.json(products);
    });
});
//ödev anasayfada scrool angular küçüphanesi ile ana sayfayı 132 video 2:30 dan izle
module.exports = router;