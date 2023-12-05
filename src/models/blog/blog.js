const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const BlogSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  title1: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  content1: {
    type: String,
    required: true,
  },
  content2: {
    type: String,
    required: false,
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

BlogSchema.plugin(timestampPlugin);

let Blog = mongoose.model("Blog", BlogSchema);

module.exports = { Blog };