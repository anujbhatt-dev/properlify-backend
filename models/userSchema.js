const mongoose = require("../DbConnection/db");

const userSchema = mongoose.Schema({
    name:{
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
    accountType:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    Property: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'properties'
    }]
});

const User = mongoose.model('users',userSchema);

module.exports = User;