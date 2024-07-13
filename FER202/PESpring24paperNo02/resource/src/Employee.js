import { Link ,useParams} from "react-router-dom";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from 'react';

const Employess = () => {
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
            <h2 style={{ textAlign: 'center' }}>List Of Employees</h2>
            <Link to="/">Home page</Link>
            <h3>Department:{departmentName}</h3>
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
                    {employees.map(em => (
                        <tr key={em.id}>
                            <td>{em.id}</td>
                            <td>{em.name}</td>
                            <td>{em.dob}</td>
                            <td>{em.gender}</td>
                            <td>{em.position}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default Employess;