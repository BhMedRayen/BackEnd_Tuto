const express = require('express');
const app=express();
const Product=require('./models/product')
require('./config/connect')
app.use(express.json())














/**************************************** Product crud ****************************************/  
/**************************************** Create ****************************************/  

app.post('/addProduct',async (req,res)=>{
    try {
       data = req.body;
       produit = new Product(data)
       save_product=await produit.save()
       res.send(save_product)
    } catch (error) {
        res.send(error)
    }
})
/**************************************** Read ****************************************/  
app.get('/getProduct', async (req,res)=>{
    try {
        products=await Product.find();
        res.send(products)
    } catch (error) {
        res.status(404).send(error)
    }
})
/**************************************** Read by id ****************************************/  
app.get('/getProductById/:id',async (req,res)=>{
    try {
        id_produit=req.params.id
        produit = await Product.findById({_id:id_produit})
        res.send(produit)
    } catch (error) {
        res.status(404).send(error)
    }
})
/**************************************** Update ****************************************/
app.put('/UpdateProduct/:id',async(req,res)=>{
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
app.delete('/deleteProduct/:id',async(req,res)=>{
   try {
        id_produit=req.params.id;
        produit = await Product.findByIdAndDelete( {_id:id_produit} )
        res.send(produit)
        console.log('Produit supprimé')
   } catch (error) {
         res.status(404).send(error)
   }
})

app.listen(3000,()=>{
    console.log('server work')  
})