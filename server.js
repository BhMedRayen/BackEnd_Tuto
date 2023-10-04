const express = require('express');
const app=express();
const User=require('./models/user');
require('./config/connect')
app.use(express.json());
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

app.get('/getall',(req,res)=>{
   User.find().then(
     (users)=>{
        res.send(users);
     }
   ).catch(
    (err)=>res.send(err)
   )
});

app.get('/allUsers',async (req , res)=>{
    try {
        foundUsers=await User.find( { last_name : "Montasar" } );
        res.send(foundUsers);
        
    } catch (error) {
        res.send(error)
    }
})



app.put('/update',()=>{
    console.log('update work')
})

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        Id_delete = req.params.id;
        user_to_delete = await User.findByIdAndDelete({ _id: Id_delete });
        res.send(user_to_delete);
    } catch (error) {
        res.send(error);
    }
});

app.get('/getuser/:id',async (res,req)=>{
        try {
            myId=req.params.id;
            user1= await User.findOne({_id:myId})
            res.send(user1);
        } catch (error) {
            res.send(error);
        }
})



app.listen(3000,()=>{
    console.log('server work')  
})