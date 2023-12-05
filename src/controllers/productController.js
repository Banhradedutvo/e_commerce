const { Product } = require("../models/product");
const { Category } = require("../models/category");
const { Company } = require("../models/company");
const productValidator = require("../middlewares/validators/productValidator");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/product");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const productController = {
  addProduct: async (req, res) => {
    try {
      const {
        product_id,
        name,
        category,
        price,
        sale,
        quantity,
        imageUrl,
        description,
        company,
      } = req.body;

      // Kiểm tra dữ liệu đầu vào sử dụng validator
      const validationResult = productValidator.validate(req.body);

      if (validationResult.error) {
        return res.status(400).json({
          status: "error",
          message: "Dữ liệu không hợp lệ",
          error: validationResult.error.details[0].message,
        });
      }

      // Kiểm tra sản phẩm trùng lặp
      const existingProduct = await Product.findOne({ product_id });
      if (existingProduct) {
        return res.status(409).json({
          status: "error",
          message: "Sản phẩm đã tồn tại",
        });
      }

      // Tiếp tục xử lý khi dữ liệu hợp lệ
      const newProduct = new Product({
        product_id,
        name,
        category,
        price,
        sale,
        quantity,
        imageUrl,
        description,
        company,
      });

      const saveProduct = await newProduct.save();

      await Promise.all([
        Category.findByIdAndUpdate(category, {
          $push: { product: saveProduct._id },
        }),
        Company.findByIdAndUpdate(company, {
          $push: { product: saveProduct._id },
        }),
      ]);

      res.status(200).json({
        status: "success",
        message: "Thêm sản phẩm thành công!",
        data: saveProduct,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Lỗi máy chủ",
        error: error.message,
      });
    }
  },

  getAllProduct: async (req, res) => {
    const PAGE_SIZE = 12;
    const page = parseInt(req.query.page);
    const category = req.query.category;
    const company = req.query.company;
    const sort = req.query.sort;
    const filter = req.query.filter;
    // ! TH1:
    if (req.query.category && req.query.company && req.query.filter) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          $and: [
            { category: category },
            { company: company },
            { name: { $regex: filter, $options: "i" } },
          ],
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          $and: [
            { category: category },
            { company: company },
            { name: { $regex: filter, $options: "i" } },
          ],
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    }

    // ! TH2
    else if (req.query.category && req.query.filter) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          $and: [
            { category: category },
            { name: { $regex: filter, $options: "i" } },
          ],
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          $and: [
            { category: category },
            { name: { $regex: filter, $options: "i" } },
          ],
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    }
    // !TH 3
    else if (req.query.company && req.query.filter) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          $and: [
            { company: company },
            { name: { $regex: filter, $options: "i" } },
          ],
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          $and: [
            { company: company },
            { name: { $regex: filter, $options: "i" } },
          ],
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (req.query.category) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          category: category,
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          category: category,
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (req.query.company) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          company: company,
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          company: company,
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (req.query.filter) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          name: { $regex: filter, $options: "i" },
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          name: { $regex: filter, $options: "i" },
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    } else
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find()
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find();

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }

    //   try {
    //     const products = await Product.find({})
    //       .sort({ price: 1 })
    //       .populate("category");

    //     const productss = await Product.find();
    //     const total = Math.ceil(productss.length / PAGE_SIZE);
    //     res
    //       .status(200)
    //       .json({ last_page: total, current_page: 1, data: products });
    //   } catch (error) {
    //     res.status(500).json(error);
    //   }
    // }
  },

  getDetailProduct: async (req, res) => {
    try {
      // req.params.id
      const product = await Product.findById(req.params.id).populate(
        "category"
      );
      res.status(200).json({ data: product });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      await product.updateOne({ $set: req.body });
      res.status(200).json("Cập nhật sản phẩm thành công !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      // ! Tìm và lấy ra product trong category
      await Category.updateMany(
        { product: req.params.id },
        { $pull: { product: req.params.id } }
      );
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa sản phẩm thành công !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = { productController, upload };
