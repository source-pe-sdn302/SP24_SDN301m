import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    type: "",
    department: "",
  });

  const [errors, setErrors] = useState({});
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9999/departments")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setDepartment(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);
  /*************  ✨ Codeium Command ⭐  *************/
  /******  09f5b87d-c28a-4372-8035-082a071348ea  *******/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Project name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.department) newErrors.department = "Department is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      axios.post("http://localhost:9999/projects", formData).catch((error) => {
        console.error("Error submitting form:", error);
      });
      alert("Form submitted successfully", formData);
      setErrors({});
      // Reset the form
      setFormData({
        name: "",
        description: "",
        startDate: "",
        type: "",
        department: "",
      });
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Add a new Project</h2>
      <Link to="/" className="px-3 py-5">
        Home page
      </Link>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formProjectName">
          <Form.Label>Project name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStartDate">
          <Form.Label>Start date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            isInvalid={!!errors.startDate}
          />
          <Form.Control.Feedback type="invalid">
            {errors.startDate}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            isInvalid={!!errors.type}
          />
          <Form.Control.Feedback type="invalid">
            {errors.type}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            name="department"
            value={formData.department}
            onChange={handleChange}
            isInvalid={!!errors.department}
          >
            <option value="">Select department</option>
            {department.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.department}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          {department.map((department) => (
            <div>
              <Form.Check
                type="radio"
                name="department"
                id={department._id}
                label={department.name}
                value={department._id}
                checked={formData.department === department._id}
                onChange={handleChange}
              />
            </div>
          ))}
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default AddProject;
