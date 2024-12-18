const express = require("express");
const db = require("../models");

const ApiRouter = express.Router();

ApiRouter.get("/projects", async (req, res, next) => {
  try {
    const projects = await db.Project.find().populate("department");
    res.status(200).json(
      projects.map((p) => {
        return {
          _id: p._id,
          name: p.name,
          description: p.description,
          startDate: p.startDate,
          type: p.type,
          departmentId: p.department._id,
          departmentName: p.department.name,
        };
      })
    );
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.get("/employees/:dept", async (req, res, next) => {
  try {
    const dept = req.params.dept;
    const employees = await db.Employee.find({
      department: dept,
    }).populate("department");
    res.status(200).json(
      employees.map((e) => {
        return {
          _id: e._id,
          name: e.name,
          dob: e.dob,
          gender: e.gender,
          position: e.position,
        };
      })
    );
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.post("/projects", async (req, res, next) => {
  try {
    const data = req.body;
    const newProject = await db.Project.create({
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      type: data.type,
      department: data.department,
    });
    res.status(200).json(newProject);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});
ApiRouter.get("/departments", async (req, res, next) => {
  try {
    const departments = await db.Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.get("/department/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const department = await db.Department.findById(id);
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.put("/project/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updateProject = await db.Project.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          description: data.description,
          startDate: data.startDate,
          type: data.type,
          department: data.department,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateProject);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.get("/project/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const project = await db.Project.findById(id).populate("department");
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.delete("/project/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const project = await db.Project.findByIdAndDelete(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

module.exports = ApiRouter;
