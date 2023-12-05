const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: false,
    default: "customer",
  },
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 50,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 20,
  },
  ward_id: {
    type: String,
    required: false,
  },
  address_detail: {
    type: String,
    required: false,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
});

UserSchema.plugin(timestampPlugin);

let User = mongoose.model("User", UserSchema);

module.exports = { User };