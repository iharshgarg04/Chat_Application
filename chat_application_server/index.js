const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.listen(PORT,()=>{
    console.log(`server is running on "http://localhost:${PORT}"`);
});