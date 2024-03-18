const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {

      const comment = await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        likes: 0,
      });
      console.log("Comment has been added!");
      res.json(comment)
    } catch (err) {
      console.log(err);
    }
  },
};
