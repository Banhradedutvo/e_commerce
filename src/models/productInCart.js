const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const ProductInCartSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    unique: true,
  },
});

ProductInCartSchema.plugin(timestampPlugin);

let ProductInCart = mongoose.model("ProductInCart", ProductInCartSchema);

module.exports = { ProductInCart };