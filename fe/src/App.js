// Import dependencies
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectsList from "./projectList";
import EmployeesList from "./employeeList";
import AddProject from "./addProject";
import UpdateProject from "./updateProject";

const App = () => (
  <Router>
    <Container>
      <Routes>
        <Route path="/" element={<ProjectsList />} />
        <Route path="/employees/:dept" element={<EmployeesList />} />
        <Route path="/project/:id" element={<UpdateProject />} />
        <Route path="/projects/add" element={<AddProject />} />
        <Route
          path="/home"
          element={<h1>Welcome to the Project Management App</h1>}
        />
      </Routes>
    </Container>
  </Router>
);

export default App;
