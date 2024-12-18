const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const projectSchema = new Schema(
  {
    name: String,
    description: String,
    startDate: String,
    type: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("projects", projectSchema);

module.exports = Project;
