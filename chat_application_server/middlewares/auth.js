const jwt = require("jsonwebtoken");
const User = require("../models/user")
const expressAsyncHandler = require("express-async-handler")

exports.protect  = expressAsyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select("-password");
            next();
        }catch(error){
            res.status(401);
            console.log(error);
            console.log("Not Authorized , token failed" );
            return res.json({ error: 'Not Authorized, token failed' });
        }
    }

    if(!token){
        res.status(401);
        console.log("Not Authorized , token failed" );
        return res.json({ error: 'Not Authorized, token missing' });
    }

})