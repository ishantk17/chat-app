const express = require('express');
const mongoose = require('mongoose');
require('../models/User')
const router = express.Router();

const User=mongoose.model('userModel');
router.post('/auth',(req,res)=>{
    const useremail=req.email;
    const userpass=req.password;
    const findFunc=async()=>{
        try {
            const findUser=await User.findOne({email:useremail});
        if(findUser){
            const pass=findUser.password;
            if(userpass===pass){
                window.alert("signed in successfully");
                res.redirect('/dashboard');
            }else{
                window.alert("incorrect password or username");
                res.redirect('/auth');
            }
        }else{
            const createUser=await User.create(req.body);
            res.redirect('/dashboard');

        }
        } catch (error) {
            console.log(error);
            res.status(500).send("something went wrong");
        }
        
    }
});

module.exports=router;
