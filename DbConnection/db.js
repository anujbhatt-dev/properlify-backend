const mongoose = require('mongoose');
const dotenv  = require('dotenv');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb connected");
})
.catch(()=>{
    console.log("Connection error");
});

module.exports=mongoose;