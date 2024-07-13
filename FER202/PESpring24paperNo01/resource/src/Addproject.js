import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useNavigate } from 'react-router-dom';
import { Table, Container, Form, Button, Alert, FormControl } from 'react-bootstrap';
import axios from 'axios';

const Add = () => {
    const [projects, setProjects] = useState([]);
    const [departments, setdepartment] = useState([]);

    const [projectname, setprojectname] = useState('');
    const [descriptions, setdescriptions] = useState('');
    const [startDate, setstartDate] = useState([]);
    const [type, settype] = useState([]);
    const [selectDepartment, setselectDepartment] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [fullnameError, setFullnameError] = useState(false); // Thêm biến trạng thái để theo dõi lỗi blank Projectname
    const navigate = useNavigate()

    //lấy dữ liệu của bảng project và bảng department
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

    // Hàm này được gọi khi người dùng nhấn nút "Create".
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Kiểm tra xem tên dự án có trống hay không. Nếu trống, set fullnameError thành true.
        if (projectname.trim() === '') {
            setFullnameError(true);
            return; // Dừng xử lý khi có lỗi
        }
        // hàm tạo 1 project mới (tên bên trái giống kiểu tên trong DB)
        const newProject = {
            name: projectname,
            description: descriptions,
            startDate: startDate,
            type: type,
            department: selectDepartment,
        };
        try {
            //Gửi yêu cầu POST tới API để tạo dự án mới.
            await axios.post('http://localhost:9999/projects', newProject);
            // Reset form or show success message
            setShowAlert(true);
            setFullnameError(false); // Đặt fullnameError về false sau khi xử lý thành công
        } catch (error) {
            console.error('Error creating project:', error);
            // Handle error here, maybe set another alert for error
        }
    };

    useEffect(() => {
        if (showAlert) {
            // Hiển thị alert và chuyển hướng về trang chủ
            alert("Created Successfully!");
            navigate('/');
        }
    }, [showAlert, navigate]);
    return (
        <Container>

            <h2 style={{ textAlign: 'center' }}>Add a new Project</h2>
            <Link to="/">Home page</Link>

            <Form onSubmit={handleSubmit}>

                {/* form của project name */}
                
                <Form.Group className="mb-3">
                    <Form.Label>Project Name:</Form.Label>
                    <Form.Control type="text" value={projectname} onChange={(e) => {
                        setprojectname(e.target.value);
                        setFullnameError(false); // Reset error when input changes
                      
                    }}
                    
                    />
                      {fullnameError && alert('Please enter the form fields that are required')}
                </Form.Group>
                {/* form của project name */}

                {/* form của Description*/}
                <Form.Group className="mb-3" style={{ marginTop: '30px' }}>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows={4} type="text" value={descriptions} onChange={(e) => setdescriptions(e.target.value)} />
                </Form.Group>
                {/* form của Description */}

                {/* form của Start Date */}
                <Form.Group className="mb-3" style={{ marginTop: '30px' }}>
                    <Form.Label>Start Date:</Form.Label>
                    <Form.Control type="Date" value={startDate} onChange={(e) => setstartDate(e.target.value)} />
                </Form.Group>
                {/* form của Start Date */}


                {/* form của  Type */}
                <Form.Group className="mb-3" style={{ marginTop: '30px' }}>
                    <Form.Label>Type:</Form.Label>
                    <Form.Control type="text" value={type} onChange={(e) => settype(e.target.value)} />
                </Form.Group>
                {/* form của  Type */}


                {/* load DB dưới dạng dropdown */}
                {/* form của  Departments */}
                <Form.Group >
                    <Form.Label>Departments:</Form.Label>
                    <Form.Control as="select" value={selectDepartment} onChange={(e) => setselectDepartment(e.target.value)}> 
                        {/* <option>Select one</option> */}
                        {departments.map((d) => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                         ))} 
                     </Form.Control>
                </Form.Group>
                {/* form của  Departments */}


              



                {/* // load DB dưới dạng radio */}
                {/* form của  Departments */}
                {/* <Form.Group>
                    <Form.Label>Departments:</Form.Label>
                    <div>
                        {departments.map((d) => (
                            <Form.Check
                                key={d.id}
                                type="radio"
                                id={d.id}
                                name="selectDepartment"
                                label={d.name}
                                value={d.id}
                                checked={selectDepartment === d.id}
                                onChange={(e) => setselectDepartment(e.target.value)}
                            />
                        ))}
                    </div>
                </Form.Group> */}
                {/* form của  Departments */}


                {/* //load dưới dạng checkbox nhưng mà chỉ đc chọn 1 ô , KHÔNG dc chọn nhiều ô cùng lúc */}
                {/* form của  Departments */}
                {/* <Form.Group>
                    <Form.Label>Departments:</Form.Label>
                    <div>
                        {departments.map((d) => (
                            <Form.Check
                                key={d.id}
                                type="checkbox"
                                id={d.id}
                                label={d.name}
                                value={d.id}
                                checked={selectDepartment === d.id}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setselectDepartment(e.target.value);
                                    } else {
                                        setselectDepartment(''); // Không chọn department nào khi bỏ chọn checkbox
                                    }
                                }}
                            />
                        ))}
                    </div>
                </Form.Group> */}
                {/* form của  Departments */}


                {/* //load dưới dạng checkbox đc chọn nhiều ô cùng lúc */}
                {/* form của  Departments */}
                {/* <Form.Group>
                    <Form.Label>Departments:</Form.Label>
                    <div>
                        {departments.map((d) => (
                            <Form.Check
                                key={d.id}
                                type="checkbox"
                                id={d.id}
                                label={d.name}
                                value={d.id}
                                checked={selectDepartment.includes(d.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setselectDepartment([...selectDepartment, e.target.value]);
                                    } else {
                                        setselectDepartment(selectDepartment.filter((id) => id !== e.target.value));
                                    }
                                }}
                            />
                        ))}
                    </div>
                </Form.Group> */}

                {/* nút create */}
                <div style={{ marginTop: "20px" }}>
                    <Button type="submit" style={{ marginRight: '30px', width: '80px' }} variant='primary'>Create</Button>
                </div>
            </Form>
        </Container>

    )
};

export default Add;