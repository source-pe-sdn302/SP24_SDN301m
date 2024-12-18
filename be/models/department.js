const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const departmentSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Department = mongoose.model("departments", departmentSchema);

module.exports = Department;
