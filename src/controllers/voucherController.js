const { Voucher } = require("../models/voucher");

const voucherController = {
  addVoucher: async (req, res) => {
    try {
      const newVoucher = new Voucher({
        code: req.body.code,
        value: req.body.value,
      });
      const saveVoucher = await newVoucher.save();
      res.status(200).json({
        message: "Thêm thành công.",
        create_voucher: saveVoucher,
      });
    } catch (error) {
      res.send(error);
    }
  },

  getAllVoucher: async (req, res) => {
    try {
      const filter = req.query.filter;

      if (req.query.filter) {
        const voucher = await Voucher.findOne({
          code: filter,
        });
        res.status(200).json({ data: voucher });
      } else {
        const voucher = await Voucher.find();
        res.status(200).json({ data: voucher });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //   updateCompany: async (req, res) => {
  //     try {
  //       const company = await Company.findById(req.params.id);
  //       await company.updateOne({ $set: req.body });
  //       res.status(200).json("Updated successfully !");
  //     } catch (error) {
  //       res.status(500).json(error);
  //     }
  //   },

  deleteVoucher: async (req, res) => {
    try {
      await Voucher.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa thành công !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = voucherController;
