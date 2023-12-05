const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const CompanySchema = new mongoose.Schema({
  company_id: {
    require: true,
    unique: true,
    type: mongoose.Schema.Types.Mixed,
  },
  name: {
    require: true,
    type: String,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

CompanySchema.plugin(timestampPlugin);

const Company = mongoose.model("Company", CompanySchema);

module.exports = { Company };