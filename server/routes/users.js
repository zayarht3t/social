const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const {verifyToken} = require("../verifyToken");

router.put('/:id',verifyToken,userController.updateUser);
router.delete("/:id",verifyToken,userController.deleteUser);
router.get("/find/:id",userController.getUser);
router.put('/follow/:id',verifyToken,userController.followUser);
router.put("/unfollow/:id",verifyToken,userController.unfollowUser);
router.post("/findByName",userController.getUserByName);
router.post('/findAll',userController.user)
router.put("/addCover",userController.addCover);


module.exports = router;