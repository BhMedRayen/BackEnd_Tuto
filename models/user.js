const mongoose = require('mongoose');

const User = mongoose.model('User',{
    name : {
        type : String
    },
    last_name : {
        type : String
    },
    age : {
        type : Number
    },
    email : {
        type : String
    },
    password : {
        type  : String
    }
})

module.exports = User;