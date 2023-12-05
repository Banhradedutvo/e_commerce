const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const bannerSchema = new mongoose.Schema({
  status: {
    type: Number,
    default: 4,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

bannerSchema.plugin(timestampPlugin);

let Banner = mongoose.model("Banner", bannerSchema);

module.exports = { Banner };