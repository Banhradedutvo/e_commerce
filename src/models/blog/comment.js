const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const CommentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rep_comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RepComment",
    },
  ],
});

CommentSchema.plugin(timestampPlugin);

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };