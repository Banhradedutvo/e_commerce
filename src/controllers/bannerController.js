const { Banner } = require("../models/banner");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationFolder = "./public/images/banner";

    // Kiểm tra xem thư mục đích có tồn tại không
    if (!fs.existsSync(destinationFolder)) {
      // Nếu không tồn tại, tạo mới
      fs.mkdirSync(destinationFolder, { recursive: true });
    }

    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const bannerController = {
  addBanner: async (req, res) => {
    try {
      const newBlog = new Banner({
        imageUrl: req.file.path,
      });

      const saveBlog = await newBlog.save();

      res.status(200).json({
        message: "successfully.",
        data: saveBlog,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDefalut: async (req, res) => {
    try {
      const blog = await Banner.find({
        $or: [{ status: "1" }, { status: "2" }, { status: "3" }],
      }).sort("status");

      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllBlog: async (req, res) => {
    const PAGE_SIZE = 12;

    const page = parseInt(req.query.page);

    try {
      const skip = (page - 1) * PAGE_SIZE;
      const status = req.query.status;

      if (status) {
        const blog = await Banner.findOne({
          status: status,
        });

        const total = Math.ceil(blog.length / PAGE_SIZE);

        res.status(200).json({
          last_page: total,
          current_page: page,
          data: blog,
        });
      } else {
        const blog = await Banner.find()
          .skip(skip)
          .limit(PAGE_SIZE)
          .sort("created_at");

        const total = Math.ceil(blog.length / PAGE_SIZE);

        res.status(200).json({
          last_page: total,
          current_page: page,
          data: blog,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateBlog: async (req, res) => {
    try {
      const banner = await Banner.findById(req.params.id);
      await banner.updateOne({
        status: req.body.status,
      });
      res.status(200).json("Updated successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteBlog: async (req, res) => {
    try {
      await Banner.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = { bannerController, upload };
