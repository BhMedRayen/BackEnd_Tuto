const express = require ('express')
 
const product_route = require('./routes/product');
const user_route = require('./routes/user')

require('./config/connect')

const app = express()

app.use('/product',product_route)
app.use('/user',user_route)
app.use('/getimage',express.static('./uploads'))




app.listen(3000,()=>{
    console.log('connected')
})