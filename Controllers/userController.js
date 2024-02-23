const {json}=require("express")
const users=require('../Models/userSchema');
//import json wweb token
const jwt=require('jsonwebtoken')

//register logic
exports.register=async(req,res)=>{
    console.log("inside register function");

    const {username,email,password}=req.body;
    //if already email in db
    try{
    const existingUser=await users.findOne({email});
    
        if(existingUser){
            res.status(401).json("user already registered")
        }
        else{
            const newUser=await users({
                username,email,password,github:"",link:"",profile:""
            })
            await newUser.save()
            res.status(200).json("user registration successful")
        }
    }
     catch(err){
        res.status(500).json("server error:"+err.message);
     }
    console.log(`${username}  ${email}  ${password}`);

    // res.status(200).json("register request recieved");
}
 
//login logic
exports.login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await users.findOne({email,password})
        if(user){
            //token generation
            const token=jwt.sign({userId:user._id},"superkey2024")
            console.log(token);
            res.status(200).json({user,token})//respomse
            
        }
        else{
            res.status(404).json("invalid login")
        }
    }    
        catch(err){
            res.status(500).json
("server error:"+err.message)        
    }
}