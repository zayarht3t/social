const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req,res,next)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const existUser = await User.findOne({email: email});
        if (existUser) return res.status(401).json("User already exist");

        const salt =await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
    
        const newUser = new User({
            email: email,
            username: username,
            password: hashPassword
        })
        
        const user =await newUser.save();
        res.status(200).json("user created");
    } catch (error) {
        next(error);
    }
   

}

exports.signin =async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        const user =await User.findOne({email: email});
        if(!user) return res.status(404).json("User Not found");
        const checkPassword =await bcrypt.compare(password,user.password);
        if(!checkPassword) return res.status(404).json("email or password wrong");
        const token = jwt.sign({id: user._id},"supersecret");
        //const {password,...other} = user._doc;
        res.cookie("access_token",token).status(200).json(user);
       
    }catch(error){
        next(error);
    }

}