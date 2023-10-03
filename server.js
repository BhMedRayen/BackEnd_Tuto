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





app.get('/getall',()=>{
    console.log('get work');
});

app.put('/update',()=>{
    console.log('update work')
})

app.delete('/delete',()=>{
    console.log('delete work')
})

app.listen(3000,()=>{
    console.log('server work')  
})