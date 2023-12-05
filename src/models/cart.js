const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cart_id: {
    type: String,
    require: false,
  },
  status: {
    type: String,
    require: true,
    default: "open",
  },
  note: {
    type: String,
    require: true,
    default: "",
  },
  product_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductInCart",
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

CartSchema.plugin(timestampPlugin);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };