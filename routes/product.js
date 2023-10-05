const express = require('express');
const router = express.Router();
const Product=require('../models/product')
const multer = require('multer')
filename = '';
const mystorage = multer.diskStorage({
    destination : './uploads',
    filename : (req,file,redirect )=>{
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1]
        redirect(null,fl)
        filename = fl 
    }
})

const upload = multer({storage : mystorage})

/**************************************** Product crud ****************************************/  
/**************************************** Create ****************************************/  

router.post('/addProduct',upload.any('image'),async (req,res)=>{
    try {
       data = req.body;
       produit = new Product(data)
       save_product=await produit.save()
       save_product.image=filename  
       res.send(save_product)
       filename=''
    } catch (error) {
        res.send(error)
    }
})
/**************************************** Read ****************************************/  
router.get('/getProduct', async (req,res)=>{
    try {
        products=await Product.find();
        res.send(products)
    } catch (error) {
        res.status(404).send(error)
    }
})
/**************************************** Read by id ****************************************/  
router.get('/getProductById/:id',async (req,res)=>{
    try {
        id_produit=req.params.id
        produit = await Product.findById({_id:id_produit})
        res.send(produit)
    } catch (error) {
        res.status(404).send(error)
    }
})
/**************************************** Update ****************************************/
router.put('/UpdateProduct/:id',async(req,res)=>{
    try {
        id_produit=req.params.id;
        data = req.body;
        produit = await Product.findByIdAndUpdate({_id:id_produit},data)
        res.send(produit)
        console.log('produit updated')
    } catch (error) {
        res.status(404).send(error)
    }
})
/**************************************** Delete ****************************************/
router.delete('/deleteProduct/:id',async(req,res)=>{
   try {
        id_produit=req.params.id;
        produit = await Product.findByIdAndDelete( {_id:id_produit} )
        res.send(produit)
        console.log('Produit supprimé')
   } catch (error) {
         res.status(404).send(error)
   }
})
module.exports=router; 