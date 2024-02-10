const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const multer = require('multer');
const session = require('express-session');

const userRoute =require('./routes/userRoute');
const propertyRoute=require('./routes/propertyRoute');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Session
app.use(session({
    secret:"personal",
      resave: false,
      saveUninitialized: false, 
      cookie: {
        maxAge: 24 * 24 * 60 * 60 * 1000, 
      },
}));



app.use('/user',userRoute);
app.use('/property',propertyRoute);







const PORT = process.env.PORT||5000;
server.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})