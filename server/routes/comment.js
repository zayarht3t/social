const {verifyToken} = require("../verifyToken");
const express = require("express");
const router = express.Router();
const commentController = require('../controllers/comments');

router.post('/add',verifyToken,commentController.addComment);
router.get('/get/:id',verifyToken,commentController.getComments)

module.exports = router;
