const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const ProductSchema = new mongoose.Schema({
  product_id: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  price: {
    type: Number,
    require: true,
  },
  sale: {
    type: Number,
    require: true,
    default: 0,
  },
  imageUrl: {
    type: String,
    require: false,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  quantity: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
    require: false,
  },
  description: {
    type: String,
    require: true,
  },
  blog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  rate: {
    type: Number,
    require: false,
  },
});

ProductSchema.plugin(timestampPlugin);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };