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
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const EmployeesList = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);
  const [depName, setDepName] = useState("");
  const { dept } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9999/employees/${dept}`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setEmployees(data);
        setFilter(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setEmployees([]);
        setFilter([]);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:9999/department/${dept}`)
      .then((response) => {
        const data = response.data;
        setDepName(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);
  useEffect(() => {
    const filtered = employees.filter((employees) =>
      employees.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilter(filtered);
  }, [searchTerm, employees]);
  const handleModalOpen = (type, course = null) => {
    setModalType(type);
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  const handleSave = () => {
    // Logic for adding/updating/deleting courses
    setShowModal(false);
  };

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h2 className="text-center">List of Employees</h2>
        </Col>
      </Row>
      <Link to="/">Back to home</Link>
      <h3>Department: {depName.name}</h3>
      <Row className="mb-3">
        <Col md={9}>
          <Form.Control
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3} className="text-end">
          <Button variant="primary" onClick={() => handleModalOpen("add")}>
            Add employee
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Employee name</th>
                <th>Date of birth</th>
                <th>Gender</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {filter.length > 0 ? (
                filter.map((e) => (
                  <tr key={e._id}>
                    <td>{e._id}</td>
                    <td>{e.name}</td>
                    <td>{e.dob}</td>
                    <td>{e.gender}</td>
                    <td>{e.position}</td>
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
            <p>Are you sure you want to delete this course?</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Course Title</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedCourse?.Title || ""}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedCourse?.Description || ""}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Instructor ID</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedCourse?.InstructorId || ""}
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

export default EmployeesList;
