const mongoose = require("mongoose");
const timestampPlugin = require("mongoose-timestamp");

const specificationSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  details: [
    {
      name: String,
      value: String,
    },
  ],
});

specificationSchema.plugin(timestampPlugin);

let Specification = mongoose.model("Specification", specificationSchema);

module.exports = { Specification };