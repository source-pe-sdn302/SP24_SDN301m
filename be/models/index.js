const mongoose = require("mongoose");
const Department = require("./department");
const Employee = require("./employee");
const Project = require("./project");

const db = {};

db.Department = Department;
db.Employee = Employee;
db.Project = Project;

module.exports = db;
