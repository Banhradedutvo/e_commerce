const { Category } = require("../models/category");
const { Product } = require("../models/product");
// const express = require("express");
// const moogoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/category");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const categoryController = {
  addCategory :async (req, res) => {
    try {
      const { name, category_id, imageUrl } = req.body;
  
      // Kiểm tra các trường bắt buộc
      if (!name || !category_id || !imageUrl) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin bắt buộc",
        });
      }
  
      // Kiểm tra danh mục trùng lặp
      const existingCategory = await Category.findOne({ category_id: category_id });
      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: "Danh mục đã tồn tại",
        });
      }
  
      // Tiếp tục xử lý và lưu danh mục
      const newCategory = new Category({
        name: name,
        category_id: category_id,
        imageUrl: imageUrl,
      });
  
      const savedCategory = await newCategory.save();
  
      res.status(201).json({
        success: true,
        message: "Thêm danh mục thành công!",
        data: savedCategory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi trong quá trình thêm danh mục!",
        error: error.message,
      });
    }
  },
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      if (!categories) {
        return res.status(404).json({ message: "Không tìm thấy danh mục" });
      }
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDetailcategory: async (req, res) => {
    try {
      const category = await Category.find({
        category_id: req.params.id,
      }).populate("product");
      
      res.status(200).json({ data: category });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Không tìm thấy danh mục" });
      }
      await category.updateOne({ $set: req.body });
      res.status(200).json({ message: "Cập nhật danh mục thành công !" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await Product.updateMany({ category: req.params.id }, { category: null });
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa danh mục thành công !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = { categoryController, upload };
// module.exports = upload;
