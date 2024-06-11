import express from 'express';
const app=express();
import configApp from './config/config.js';
configApp(app)
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})