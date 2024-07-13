import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Table, Button, Modal, Form, Col, Row, Container, Nav } from 'react-bootstrap';
import axios from 'axios';
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
// tạo để chọn và sort
const [selectedDepartment, setSelectedDepartment] = useState(null);
const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch products from JSON Server
        const responseProject = await axios.get('http://localhost:9999/projects');
        const responseDepartment = await axios.get('http://localhost:9999/departments');
        const departmentMap = responseDepartment.data.reduce((acc, department) => {
          acc[department.id] = department.name;
          return acc;
        }, {});
        setProjects(responseProject.data);
        setDepartments(departmentMap);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchOrders();
  }, []);


// lấy dữ liệu của department
  const [departmentss, setDepartmentss] = useState([]);
  useEffect(() => {
    const fetchDepartmentss = async () => {
      // Fetch products from JSON Server
      const responseDepartments = await axios.get('http://localhost:9999/departments');
      setDepartmentss(responseDepartments.data);
    };
    fetchDepartmentss();
  }, []);
// lấy dữ liệu của department



  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h1>Departments</h1>
        {/* Nút All */}
        <div key="all">
          <input
            type="radio"
            id="dept-all"
            value="all"
            checked={selectedDepartment === null}
            onChange={() => {
              setSelectedDepartment(null);
              setFilteredProjects([]); // Xóa bộ lọc để hiển thị tất cả các dự án
            }}
          />
          <label htmlFor="dept-all">All</label>
        </div>
         {/* Nút All */}

         {/* Các nút khác */}
        <div>
          {Object.keys(departments).map((deptId) => (
            <div key={deptId}>

              <input
                type="radio"
                id={`dept-${deptId}`}
                value={deptId}
                checked={Number(deptId) === selectedDepartment}
                onChange={() => {
                  setSelectedDepartment(Number(deptId));
                  // Lọc các dự án dựa trên phòng ban đã chọn
                  const filtered = projects.filter((project) => project.department === Number(deptId));
                  setFilteredProjects(filtered);
                }}
              />

              <label htmlFor={`dept-${deptId}`}>{departments[deptId]}</label>
            </div>
          ))}
        </div>
         {/* Các nút khác */}

      </div>
      <Container style={{ marginRight: '40px' }}>
        <h1 style={{ textAlign: 'center' }}>List Of Projects</h1>
       
        <Link to="/projects/add" class="btn btn-success">Create new  Project</Link>   {/* gắn đường link sang component create */}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Project name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>Type</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {/* filter theo radio */}
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.startDate}</td>
                  <td>{project.type}</td>
                  <td>
                    <Link to={`/departments/${project.department}/employees`}>   {/* đường link dẫn tới component Employees*/}
                      {departments[project.department]}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.startDate}</td>
                  <td>{project.type}</td>
                  <td>
                    <Link to={`/departments/${project.department}/employees`}>
                      {departments[project.department]}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </div>

  );
};

export default Projects;
