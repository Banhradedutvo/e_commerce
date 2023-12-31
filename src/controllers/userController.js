const { User } = require("../models/user/user");
const { Cart } = require("../models/cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDetailUser: async (req, res) => {
    try {
      // req.params.id
      //   const user = await User.find({
      //     user_name: req.params.id,
      //   });
      const user = await User.find({
        user_name: req.params.id,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Cập nhật tài khoản thành công !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await Cart.updateMany({ cart: req.params.id }, { cart: null });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa tài khoản thành công !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
