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
      {/* <Row>
        <Col>
          <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <Link className="navbar-brand" to="/">
              Project App
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Projects
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </Col>
      </Row> */}
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
