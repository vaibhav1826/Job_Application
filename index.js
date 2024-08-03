//express is a web application framework for node.js
const express = require('express');
const app = express();
const Port = 1800;



//server starting at localhost:1800
app.listen(Port,()=>{
    console.log(`server at localhost:${Port}`);
})