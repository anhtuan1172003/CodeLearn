import { Link,useNavigate, useParams } from "react-router-dom";
import { Table, Container, Row, Col, Button, Form, FormLabel,FormControl } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from 'react';

const Edits = () => {
const { id } = useParams(); // Get department id from URL

    const [projects, setProjects] = useState([]);
    const [departments, setdepartment] = useState([]);
    const [projectid, setprojectId] = useState(''); // Khởi tạo giá trị là null

    const [projectname, setprojectname] = useState('');
    const [descriptions, setdescriptions] = useState('');
    const [startDate, setstartDate] = useState('');
    const [type, settype] = useState('');
    const [selectDepartment, setselectDepartment] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [fullnameError, setFullnameError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
        fetchDepartments();
    }, []);
    const fetchProjects = async () => {
        const response = await axios.get('http://localhost:9999/projects');
        setProjects(response.data);

    };
    const fetchDepartments = async () => {
        const response = await axios.get('http://localhost:9999/departments');
        setdepartment(response.data);

    };
    const handleSubmitFormUpdate = (event) => {
        event.preventDefault();
        if(projectname.trim() === "" || projectname === null){
          alert("Please enter the form fields that are required.");
          return;
        }
        axios.patch(`http://localhost:9999/projects/${id}`, { //patch: chỉ gửi các thay đổi lên máy chủ để cập nhật 
                                                              //khác so với put - gửi toàn bộ tài nguyên mới lên máy chủ
          name: projectname,
          description: descriptions,
          startDate: startDate,
          type: type,
          department: parseInt(selectDepartment)
        });
        console.log("Update successfully");
        alert("Update success.");
        navigate("/")
      };
return(
    <Container>
        <h4 style={{textAlign:'center'}}>Edit Project</h4>
        <Link to = "/">Home page</Link>
        <Container>
            <Form onSubmit={handleSubmitFormUpdate}>
                <Form.Group>
                    <Form.Label>Project name</Form.Label>
                    <Form.Control type="text" value={projectname} onChange={(e)=> {
                        setprojectname(e.target.value);
                        setFullnameError(false);
                    }}></Form.Control>
                      {fullnameError && alert('Please enter the form fields that are required')}

                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={4} type="text" value={descriptions} onChange={(e) => {
                        setdescriptions(e.target.value);
                    }}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Start date</Form.Label>
                    <Form.Control type="date" value={startDate} onChange={(e) => {
                        setstartDate(e.target.value);
                    }}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control type="text" value={type} onChange={(e) => {
                        settype(e.target.value);
                    }}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Department</Form.Label>
                    <Form.Control as="select" value={selectDepartment} onChange={(e) => setselectDepartment(e.target.value)}> 
                                {departments.map((d) => (
                                    <option key ={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                
                <Button type="submit" style={{ marginTop:'20px'}}>Create</Button>

            </Form>
        </Container>
    </Container>
);
}

export default Edits;