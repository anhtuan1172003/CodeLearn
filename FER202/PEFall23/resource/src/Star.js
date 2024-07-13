import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { Table, Container, Form, Button, Alert, FormControl } from 'react-bootstrap';
import axios from 'axios';

const Stars = () => {
    const [Stars, setStars] = useState([]);
    const [id, setId] = useState('');
    const [dob, setdob] = useState('');
    const [nationalty, setnationalty] = useState('');
    const [fullname, setfullname] = useState('');
    const [gender, setgender] = useState('');
    const [description, setDescription] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [fullnameError, setFullnameError] = useState(false); // Thêm biến trạng thái để theo dõi lỗi FullName

    useEffect(() => {
        fetchStars();
    }, []);
    const fetchStars = async () => {
        const response = await axios.get('http://localhost:9999/stars');
        setStars(response.data);
    };
   
//Hàm submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra xem FullName có rỗng không
        if (fullname.trim() === '') {
            setFullnameError(true);
            return; // Dừng xử lý khi có lỗi
        }
        const newStar = {
            dob: dob,
            Nationality: nationalty,
            fullname: fullname,
            gender: gender,
            decription: description
        };
        await axios.post('http://localhost:9999/stars', newStar);
        // Reset form or show success message
      setShowAlert(true);
      setFullnameError(false); // Đặt fullnameError về false sau khi xử lý thành công

    };

    // hàm reset
    const handleReset = () => {
        setId('');
        setdob('');
        setnationalty('');
        setfullname('');
        setgender('');
        setDescription('');
        setFullnameError(false); // Đặt fullnameError về false khi reset
    };

    return (

        <Container style={{marginTop:'60px'}}>
            <h2>Create a new Star</h2>
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Created Successfully!
                   
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <div class="container text-start">
                    <div class="row">


                        <div class="col">
                            <Form.Group className="mb-3" aria-readonly>
                                <Form.Label>ID:</Form.Label>
                                <Form.Control value={0} disabled />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Date Of Birth:</Form.Label>
                                <Form.Control placeholder="mm/dd/yyyy" type="Date" value={dob} onChange={(e) => setdob(e.target.value)} />
                            </Form.Group>

                            <Form value={nationalty} onChange={(e) => setnationalty(e.target.value)}>
                                <Form.Label>Nationalty:</Form.Label>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected value="">---Select---</option>
                                    <option value="USA">USA</option>
                                    <option value="England">England</option>
                                    <option value="France">France</option>
                                </select>
                            </Form>
                        </div>



                        <div class="col">
                            <Form.Group className="mb-3">
                                <Form.Label>FullName:</Form.Label>
                                <Form.Control type="text" value={fullname} onChange={(e) => setfullname(e.target.value)} />
                                {fullnameError && <p className="text-danger">FullName is required</p>}
                            </Form.Group>

                            <Form.Label>Gender:</Form.Label>
                            <div style={{ display: 'flex' }}>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setgender(e.target.value)} />
                                    <label className="form-check-label">Male</label>
                                </div>
                                <div className="form-check" style={{marginLeft:'20px'}}>
                                    <input className="form-check-input" type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setgender(e.target.value)} />
                                    <label className="form-check-label">Female</label>
                                </div>
                            </div>

                            <Form.Group className="mb-3" style={{ marginTop: '30px' }}>
                                <Form.Label>Description:</Form.Label>
                                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                        </div>
                    </div>

                    
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button type="submit" style={{ marginRight: '30px', width: '130px' }} variant='primary'>Add</Button>
                    <button type='reset' class="btn btn-danger" onClick={handleReset}>Reset</button>
                </div>
            </Form>
        </Container>

    );
};

export default Stars;


