const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const employeeSchema = new Schema(
  {
    name: String,
    dob: String,
    gender: String,
    position: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;
