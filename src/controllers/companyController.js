const { Company } = require("../models/company");
const { Product } = require("../models/product");

const companyController = {
  addCompany: async (req, res) => {
    try {
      const { name, company_id } = req.body;
  
      if (!name || !company_id) {
        return res.status(400).json({ error: "Tên và mã công ty không được bỏ trống" });
      }
  
      const existingCompany = await Company.exists({ company_id });
      if (existingCompany) {
        return res.status(400).json({ error: "Công ty đã tồn tại trong cơ sở dữ liệu" });
      }
  
      const newCompany = new Company({
        name,
        company_id,
      });
  
      const savedCompany = await newCompany.save();
  
      res.status(200).json({
        message: "Tạo công ty thành công",
        create_company: savedCompany,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllCompany: async (req, res) => {
    try {
      const company = await Company.find().populate("product");
      res.status(200).json({ data: company });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDetailCompany: async (req, res) => {
    try {
      const company = await Company.find({
        company_id: req.params.id,
      }).populate("product");

      res.status(200).json(company);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCompany: async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      await company.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCompany: async (req, res) => {
    try {
      await Product.updateMany({ company: req.params.id }, { company: null });
      await Company.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = companyController;
// module.exports = upload;
