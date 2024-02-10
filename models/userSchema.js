const mongoose = require("../DbConnection/db");

const userSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        min:5,
    },
    type:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    }
});

const User = mongoose.model('users',userSchema);

module.exports = User;