const express = require("express");
const router = express.Router();
const User = require("./Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/",(req,res)=>{
    res.send("Hi there")
})

router.post("/register",async(req,res)=>{
    try{
        const { name, email, password, cpassword } = req.body;
        if(!name || !email || !password || !cpassword){
            res.json({"message":"Please fill your form"})
        }
        const userExist = await User.findOne({email:email});
        if(userExist){
            res.json({"message":"Email already exists"})
        } else if(password!==cpassword){
            res.json({"message":"The password confirmation does not match"})
        } else {
            const newUser = new User({name,email,password,cpassword});
            newUser.password =await bcrypt.hash(newUser.password,12);
            newUser.cpassword =await bcrypt.hash(newUser.cpassword,12);
            await newUser.save();
            res.json({"message":"User successfully registered"});
        }
    }catch(error){
        console.log(error)
    }  
})

router.post("/login",async(req,res)=>{
    try{
        const { email, password } = req.body;
        if(!email || !password){
            res.json({"message":"Please fill your form"})
        }
        const userExist = await User.findOne({email:email});
        if(!userExist){
            res.json({"message":"Invalid credentials"})
        }
        const passwordMatched =await bcrypt.compare(password,userExist.password);
        if(!passwordMatched){
            res.json({"message":"Invalid credentials"})
        } else if(passwordMatched){
            const token = jwt.sign({_id:userExist._id},process.env.PRIVATEKEY);
            userExist.tokens.push({token: token});
            userExist.save();
            res.json({"message":"User successfully logged in"})
        }
    }catch(error){
        console.log(error)
    }
})

module.exports = router;