const express = require('express');
const app=express();
require('./config/connect')
app.use(express.json())
app.listen(3000,()=>{
    console.log('server work')  
})