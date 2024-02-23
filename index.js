//loads .env file into process.env 
require('dotenv').config();

//importt express
const express=require('express');

//import cors
const  cors = require("cors");

const router = require('./Router/route');

const db=require('./DB/connection')

const appMiddleware=require('./Middlewares/appMiddleware')

const jwtMiddleware=require('./Middlewares/jwtmiddleware')

//create backend application using express
const pfServer=express();

// use 
pfServer.use(cors());
pfServer.use(express.json());

// pfServer.use(appMiddleware)-(not used in this)

pfServer.use(router);
//to export image from server to client
pfServer.use('/uploads',express.static('./uploads'))

//port creation
const PORT=4000 || process.env.PORT

//SERVER LISTEN
pfServer.listen(PORT,()=>{
console.log('listening on port'+PORT);
})

//http get resolving to http://localhost4000
pfServer.get("/",(req,res)=>{
res.send(`<h1>Project Fair is Started</h1>`)
})