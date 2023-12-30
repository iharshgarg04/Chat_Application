const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes")

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.use("/user",userRoutes);

const connectDb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected successfully")
    }
    catch(error){
        console.log("Error connecting to dataBase");
    }
};
connectDb();

app.listen(PORT,()=>{
    console.log(`server is running on "http://localhost:${PORT}"`);
});