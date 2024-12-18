import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import { Link } from "react-router-dom";
const ProjectsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:9999/projects")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setProjects(data);
        setFilter(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setProjects([]);
        setFilter([]);
      });
  }, []);
  useEffect(() => {
    let filtered = projects;

    // Lọc theo department nếu có lựa chọn
    if (selectedDepartment) {
      filtered = filtered.filter(
        (project) => project.departmentId === selectedDepartment
      );
    }

    // Lọc theo search term
    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilter(filtered);
  }, [selectedDepartment, searchTerm, projects]);
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
  const handleModalOpen = (type, project = null) => {
    setModalType(type);
    setSelected(project);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelected(null);
  };

  const handleSave = () => {
    if (modalType === "delete") {
      axios
        .delete(`http://localhost:9999/project/${selected._id}`)
        .then((response) => {
          const updatedProjects = projects.filter(
            (project) => project._id !== selected._id
          );
          setProjects(updatedProjects);
          setFilter(updatedProjects);
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
        });
    }
    setShowModal(false);
  };

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h2 className="text-center">List of Projects</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={9}>
          <Form.Control
            placeholder="Search by Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3} className="text-end">
          <Link to="/projects/add">
            <Button variant="success">Add Project</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <h4>Department</h4>
          <Form>
            <Form.Check
              type="radio"
              label="All"
              name="department"
              value=""
              checked={selectedDepartment === ""}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            />
            {department.map((dep) => (
              <Form.Check
                key={dep._id}
                type="radio"
                label={dep.name}
                name="department"
                value={dep._id}
                checked={selectedDepartment === dep._id}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              />
            ))}
          </Form>
        </Col>
        <Col md={10}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Project name</th>
                <th>Description</th>
                <th>Start date</th>
                <th>Type</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filter.length > 0 ? (
                filter.map((project) => (
                  <tr key={project._id}>
                    <td>{project._id}</td>
                    <td>
                      <Link to={`/employees/${project.departmentId}`}>
                        {project.name}
                      </Link>
                    </td>
                    <td>{project.description}</td>
                    <td>{project.startDate}</td>
                    <td>{project.type}</td>
                    <td>{project.departmentName}</td>
                    <td>
                      <Link to={`/project/${project._id}`}>
                        <Button variant="warning" size="sm">
                          Update
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleModalOpen("delete", project)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No courses available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "add"
              ? "Add Course"
              : modalType === "update"
              ? "Update Course"
              : "Delete Course"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "delete" ? (
            <p>Are you sure you want to delete this project?</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Course Title</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selected?.Title || ""}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selected?.Description || ""}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Instructor ID</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selected?.InstructorId || ""}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {modalType === "delete" ? "Confirm" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProjectsList;
