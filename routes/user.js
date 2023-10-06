const express = require('express');
const router = express.Router();
const User=require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//User Crud 
/**************************** sign up ****************************/

router.post('/signup',async(req,res)=>{
try {
        data = req.body;
        usr = new User(data); 
        salt = bcrypt.genSaltSync(10);
        cryptedPass = await bcrypt.hashSync(data.password,salt)
        usr.password = cryptedPass ; 
        user = await usr.save();
        res.status(200).send(user)
  } 
catch (error) {
    res.status(400).send()
}
})

/**************************** sign in ****************************/
router.post('/signIn',async(req,res)=>{
    try {
        data = req.body; 
        user = await User.findOne({email : data.email})
        if(!user) {
            res.status(401).send('email or password invalide ! ')
        }
        else {
            valid_pass = bcrypt.compareSync(data.password,user.password)
            if(!valid_pass){
                res.status(401).send('email or password invalide ! ')
            }
            else {
                payload = {
                    _id : user._id , 
                    email : user.email , 
                    name : user.name
                }
                token = jwt.sign(payload,'12345678')
                res.status(200).send({mytoken : token})
            }
        }
    } catch (error) {
        res.status(404).send('User not found')
    }
})


router.get('/getUserByname/:name',async(req,res)=>{
    try {
        nameUser=req.params.name;
        user=await User.find({name :nameUser})
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send(error)
    }
})

  



//create : 
router.post('/add',(req , res)=>{
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
router.post('/create', async (req , res)=>{
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
router.get('/getall',(req,res)=>{
    User.find().then(
      (users)=>{
         res.send(users);
      }
    ).catch(
     (err)=>res.send(err)
    )
 });

 //read async method 
router.get('/allUsers',async (req , res)=>{
    try {
        foundUsers=await User.find( { last_name : "Montasar" } );
        res.send(foundUsers);
        
    } catch (error) {
        res.send(error)
    }
})

//update 
router.put('/update/:id',async (req,res)=>{
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
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        Id_delete = req.params.id;
        user_to_delete = await User.findByIdAndDelete({ _id: Id_delete });
        res.send(user_to_delete);
    } catch (error) {
        res.send(error);
    }
});

//get by id 
router.get('/getuser/:id',async (req,res)=>{
    try {
        myId=req.params.id;
        user1= await User.findOne({_id:myId})
        res.send(user1);
    } catch (error) {
        res.send(error);
    }
})

module.exports=router; 