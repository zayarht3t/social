const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const {verifyToken} = require("../verifyToken");

router.post("/",verifyToken,postController.createPost);
router.get('/',verifyToken,postController.getPosts);
router.get('/find/:id',verifyToken,postController.getAPost);
router.put('/update/:id',verifyToken,postController.updatePost);
router.delete("/delete/:id",verifyToken,postController.deletePost);
router.put("/like/:id",verifyToken,postController.like);
router.put("/unlike/:id",verifyToken,postController.dislike);
router.get("/profile/:id",verifyToken,postController.getUserPost);

module.exports = router;