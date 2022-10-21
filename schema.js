const mongoose = require("mongoose");

const pieChartSchema = new mongoose.Schema(
  {
    key: {
      type: String,
    },
    portion: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("pieChart", pieChartSchema);
