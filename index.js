const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const multer = require('multer');
const session = require('express-session');
const cors = require('cors');
const path = require("path");
const userRoute  = require('./routes/userRoute');
const propertyRoute= require('./routes/propertyRoute');
require("./DbConnection/db")

// const chatRoute = require("./routes/chatRoute");
//Middlewares
// app.set('view engine', 'ejs');
// app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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



//  const connectedClients = {};
//  module.exports.connectedClients = connectedClients;
// io.on('connection', (socket) => {
//   console.log('A user connected');


//   connectedClients[socket.id] = socket;
  

 
//   socket.on('disconnect', () => {
//       console.log('A user disconnected');
//       delete connectedClients[socket.id];
//   });
// });

 

const PORT = 5000;
server.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})
