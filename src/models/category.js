const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const CategorySchema = new mongoose.Schema({
  category_id: {
    require: false,
    type: String,
    unique: true,
  },
  name: {
    require: false,
    type: String,
  },
  imageUrl: {
    require: false,
    type: String,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

CategorySchema.plugin(timestampPlugin);

const Category = mongoose.model("Category", CategorySchema);

module.exports = { Category };