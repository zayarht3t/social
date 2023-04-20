const Comment = require("../models/Comment");
exports.addComment = async (req, res, next) => {
    const newComment = new Comment({ desc: req.body.desc,postId: req.body.postId, userId: req.user.id });
    try {
      const savedComment = await newComment.save();
      res.status(200).send(savedComment);
      const io = require("../socket").getIo();
      io.emit("cmt",{savedComment});
    } catch (err) {
      next(err);
    }
  };
  
  exports.deleteComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(res.params.id);
      const video = await Video.findById(res.params.id);
      if (req.user.id === comment.userId || req.user.id === video.userId) {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("The comment has been deleted.");
      } else {
        return next(createError(403, "You can delete ony your comment!"));
      }
    } catch (err) {
      next(err);
    }
  };
  
  exports.getComments = async (req, res, next) => {
    try {
      const comments = await Comment.find({postId: req.params.id} );
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  };