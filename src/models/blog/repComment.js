const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const RepCommentSchema = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
});

RepCommentSchema.plugin(timestampPlugin);

let RepComment = mongoose.model("RepComment", RepCommentSchema);

module.exports = { RepComment };