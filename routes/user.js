const express = require('express');
const router = express.router();
const User=require('../models/user');

//User Crud 
//create : 
app.post('/add',(req , res)=>{
    data = req.body;
    user = new User(data);
    user.save().then(
     (savedUser)=>{
         res.send(savedUser)
     }
    ).catch(
     (err)=>{
         res.send(err)
     }
    )
 });

//create async method
app.post('/create', async (req , res)=>{
    try {
        data = req.body;
        user=new User(data);
        usersaved=await user.save()
        res.send(usersaved);
    } catch (error) {
        res.send(error);
    }
} )

//read 
app.get('/getall',(req,res)=>{
    User.find().then(
      (users)=>{
         res.send(users);
      }
    ).catch(
     (err)=>res.send(err)
    )
 });

 //read async method 
app.get('/allUsers',async (req , res)=>{
    try {
        foundUsers=await User.find( { last_name : "Montasar" } );
        res.send(foundUsers);
        
    } catch (error) {
        res.send(error)
    }
})

//update 
app.put('/update/:id',async (req,res)=>{
    try {
         id=req.params.id;
         new_data=req.body;
         update_user=await User.findByIdAndUpdate({_id:id} ,new_data)
         res.send(update_user);
    } catch (error) {
        res.send(error)
    }
})
 
// delete 
app.delete('/deleteUser/:id', async (req, res) => {
    try {
        Id_delete = req.params.id;
        user_to_delete = await User.findByIdAndDelete({ _id: Id_delete });
        res.send(user_to_delete);
    } catch (error) {
        res.send(error);
    }
});

//get by id 
app.get('/getuser/:id',async (req,res)=>{
    try {
        myId=req.params.id;
        user1= await User.findOne({_id:myId})
        res.send(user1);
    } catch (error) {
        res.send(error);
    }
})

module.exports=router; 