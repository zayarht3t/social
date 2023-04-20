const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const createError = require("../error").createError;

//update user
exports.updateUser =async (req,res,next)=>{     
    try {
        if(req.user.id === req.params.id){
            const salt = bcrypt.genSaltSync(10);
            const hashPassword =await bcrypt.hash(req.body.password,salt);
            req.body.password = hashPassword;
            const user = await User.findByIdAndUpdate({_id: req.user.id},{$set: req.body},{new: true});
            return res.status(200).json(user);
        }else{
            return res.status(403).json("You can only update your account");
        }
    } catch (error) {
        next(error);
    }
    
}

//delte user
exports.deleteUser = async (req,res,next)=>{
    try {
        if(req.user.id === req.params.id){
           const user = await User.findByIdAndDelete({_id: req.user.id});
            return res.status(200).json("Your account has been deleted");
        }else{
            return res.status(403).json("You can only delete your account");
        }
    } catch (error) {
        next(error);
    }
}

//get a user
exports.getUser =async (req,res,next)=>{
    try {
        const user = await User.findById({_id: req.params.id});
        if(!user) return res.status(404).json("User Not Found");
        const {password,...other} = user._doc;
        res.status(200).json(other);
    } catch (error) {
        next(error);
    }
}

//find by name
exports.getUserByName =async (req,res,next)=>{
    try {
        console.log(req.body.text)
        const user = await User.findOne({username: req.body.text});
        if(!user) return res.status(404).json("User Not Found");
         const {password,...other} = user._doc;
        res.status(200).json(other);
    } catch (error) {
        next(error);
    }
}

exports.user = async(req,res,next)=>{
    const cursor = User.find().cursor();
    const users = [];
    const text = req.body.text;
    let specificUsers = [];
    let newSomeUsers = [];
    try {
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            users.push(doc);
          }
        
        specificUsers.push(users.filter(user=>{return user.username == text}));
        let newSpecified =specificUsers.map(user=>{return user});
        newSpecified.push(users.filter(user=>{return user.username.substring(0,2) == text.substring(0,2)}));
        // specificUsers.push(newSomeUsers.map(user=>{return user}))
        for(let i=0;i<newSpecified[0].length;i++){
            newSomeUsers.push(newSpecified[0][i])
        }
        
        for(let i=0;i<newSpecified[1].length;i++){
            newSomeUsers.push(newSpecified[1][i])
        }
    
        const io = require("../socket").getIo();
        io.emit("users",{action: "search",users: users});
        res.status(201).json(newSomeUsers)
    } catch (error) {
        next(error);
    }
    
}


//follow user
exports.followUser = async(req,res,next)=>{
    try {
        if(req.user.id === req.body.userId) return res.status(403).json("You cannot follow your self");
        const user = await User.findById({_id: req.body.userId});

        const myself = await User.findById({_id: req.user.id});


        if (!user.followers.includes(req.user.id)){
           await user.updateOne({$push: {followers: req.user.id}},{new: true});
           await myself.updateOne({$push: {followings: req.params.id}},{new: true});
           res.status(200).json("successfully followed");
        } else {
            res.status(400).json("You already followed this");
        }
    } catch (error) {
        next(error);
    }
}

//unfollow 
exports.unfollowUser = async(req,res,next)=>{
    try {
        if(req.user.id === req.params.id) return res.status(403).json("You cannot unfollow your self");
        const user = await User.findById({_id: req.params.id});
        const myself = await User.findById({_id: req.user.id});
        if(!user) return res.status(404).json("User cannot found");

        if (user.followers?.includes(req.user.id)){
            await user.updateOne({$pull: {followers: req.user.id}},{new: true});
            await myself.updateOne({$pull: {followings: req.params.id}},{new: true});
            res.status(200).json("unfollowed successfully");
        } else {
            res.status(400).json("You already unfollowed this");
        }
    } catch (error) {
        next(error);
    }
}

exports.addCover =async (req,res,next)=>{
    try {
        const img = req.body.path;
        console.log(img)
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json("User Not found");

    await user.update({
        $set: {coverPicture: img}},{new: true})
    res.status(200).json(user)
    } catch (error) {
        next(error)
    }
    
    }

