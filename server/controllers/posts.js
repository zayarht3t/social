const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const User = require("../models/User");
const socket = require("../socket");
const path = require("path");
const fs= require('fs')

exports.createPost = async (req,res,next)=>{
    console.log(req.body.newPost.desc)
    try {
        const post = new Post({
            userId: req.user.id,
            desc: req.body.newPost.desc,
            img: req.body.path
        });
        await post.save();
        const io = socket.getIo();
        io.emit("posts",{action: "create",post});
        res.status(200).json( post
             
        );
    } catch (error) {
        next(error)
    }
    
}

//get posts
exports.getPosts =async (req,res,next)=>{
    try {
        let allPosts = [] ;
        const myposts = await Post.find({userId: req.user.id}).sort({createdAt: -1});
        const currentUser = await User.findById({_id: req.user.id});
        const friendPosts = await Post.find({userId: await currentUser.followings?.map(id=>id)}).sort({createdAt: -1});
        myposts.map(p=>allPosts.push(p));
        friendPosts.map(fp=>allPosts.push(fp));
        //let sortPosts = [];
        //allPosts.sort({createdAt: -1}).map(sp=>{return sortPosts.push(sp)})
        //console.log(allPosts.sort({createdAt: -1}).map(sp=>{return sp}));
        res.status(200).json(allPosts);
    } catch (error) {
        next(error);
    }
    
}

exports.getAPost = async(req,res,next)=>{
    try {
        const post = await Post.find({_id: req.params.id});
        if (!post) return res.status(404).json("Post not found");
        
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
    
}

//update post
exports.updatePost = async (req,res,next)=>{
    const post  = await Post.findOne({_id: req.params.id});
    if (!post) return res.status(404).json("Post not found");
    try {
        if(req.user.id === post.userId ){
            await post.updateOne({$set:req.body});
            res.status(200).json("updated successfully");
        } else{
            res.status(403).json("You can only update your post");
        }
    } catch (error) {
        next(error);
    }
}

//delete post
exports.deletePost = async (req,res,next)=>{
    const post  = await Post.findOne({_id: req.params.id});
    if (!post) return res.status(404).json("Post not found");
    const filepath = post.img == "undefined" ? null : post.img;
    try {
        if(req.user.id === post.userId ){
            if(filepath != null){
                clearImage(filepath)
            }
            
            await post.deleteOne({_id: req.params.id});
            const io = socket.getIo();
            io.emit("posts",{action: "delete"});
            res.status(200).json("deleted successfully");
        } else{
            res.status(403).json("You can only delete your post");
        }
    } catch (error) {
        next(error);
    }
}

//like post
exports.like = async(req,res,next)=>{
    try {
        const post = await Post.findOne({_id: req.body.post._id});
        const currentUser = await User.findById({_id: req.user.id});
        if(!post) return res.status(404).json("Post not found");

        if(!post.likes.includes(currentUser.id)){
            await Post.findByIdAndUpdate(post._id,{$addToSet: {likes: currentUser._id}});
            res.status(200).json("liked successfully");
        } else {
            res.status(403).json("You already liked");
        }
    } catch (error) {
        next(error);
    }
}

//dislike post
exports.dislike = async(req,res,next)=>{
    try {
        const post = await Post.findOne({_id: req.body.post._id});
        const currentUser = await User.findById({_id: req.user.id});
        if(!post) return res.status(404).json("Post not found");

        if(post.likes.includes(currentUser.id)){
            await Post.findByIdAndUpdate(post._id,{$pull: {likes: currentUser._id}});
            res.status(200).json("unliked successfully");
        } else {
            res.status(403).json("You already unlike");
        }
    } catch (error) {
        next(error);
    }
}

//get user's post

exports.getUserPost =async (req,res,next)=>{
    try {
        const myposts = await Post.find({userId: req.params.id}).sort({createdAt: -1});
        res.status(200).json(myposts);
    } catch (error) {
        next(error);
    }
    
}

const clearImage = (filePath)=>{
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err=> console.log(err));
};
