import { error } from "console";
import path from "path";
import { app1 } from "./src/controller";
import { init } from "./src/constants/constant";
const fs = require('fs');
const express =require('express')
const app= express();
//if you want to access the vedio link from the s3 bucket then uncomment init()
init()
// app.use('/static', express.static(path.join(__dirname, 'static')),app1);
app.use('/api/', app1);
app.listen(3000,function(){
    console.log("server is running on port 3000")
})