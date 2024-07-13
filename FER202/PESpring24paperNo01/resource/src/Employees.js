import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const { id } = useParams();
  const [departmentName, setDepartmentName] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        //lấy dữ liệu của id by sort
        const response = await axios.get(`http://localhost:9999/employees?department=${id}`);
        const sortedEmployees = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setEmployees(sortedEmployees);

        // Fetch department name by ID
        const departmentResponse = await axios.get(`http://localhost:9999/departments/${id}`);
        setDepartmentName(departmentResponse.data.name);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, [id]);
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>List Of Employees</h1>
      <Link to="/">Home page</Link>
      <h2>Department: {departmentName}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th> Employees name</th>
            <th>Date of birth</th>
            <th>Gender</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.dob}</td>
              <td>{employee.gender}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};


export default Employees;