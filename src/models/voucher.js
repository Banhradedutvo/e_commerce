const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

voucherSchema.plugin(timestampPlugin);

let Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = { Voucher };