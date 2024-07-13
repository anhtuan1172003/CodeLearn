import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { Table, Container, Form, Button, Alert, li, ul, button } from 'react-bootstrap';
import axios from 'axios';

const Directors = () => {
    const [directors, setDirectors] = useState([]);
    const [id, setId] = useState('');
    const [FullName, setFullName] = useState('');
    const [Male, setMale] = useState('');
    const [Dob, setDob] = useState('');
    const [Nationality, setNationality] = useState('');
    const [Description, setDescription] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => { fetchDirector(); }, [directors]);

    const fetchDirector = async () => {
            const response = await axios.get('http://localhost:9999/directors');
            setDirectors(response.data);
        } ;

    // hàm add
    const createPost = async () => {
        // Kiểm tra xem ID đã tồn tại trong danh sách sản phẩm chưa
        const existingDirector = directors.find(director => director.id === id);
        if (existingDirector) {
          setError('ID already exists');
          return;
        }
    
        const director = {id, FullName, Male, Dob, Nationality, Description };
        await axios.post('http://localhost:9999/directors', director);
        // Xóa trạng thái lỗi sau khi thêm sản phẩm thành công
      setShowAlert(true);
        setError('');
      };

    // hàm xóa
    const deleteDirector = async (id) => {
        await axios.delete(`http://localhost:9999/directors/${id}`);
      setShowAlert(true);
      setError('');


    };
  // hàm hỏi trc khi xóa
    const confirmDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this director?")) {
          deleteDirector(id);
      }
  };



    return (
        <Container>
           {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    Delete Successfully!
                   
                </Alert>
            )}
            <h1>Director List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>FullName</th>
                        <th>Male</th>
                        <th>Dob</th>
                        <th>Nationality</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {directors.map(director => (
                        <tr key={director.id}>
                            <td>{director.id}</td>
                            <td>{director.FullName}</td>
                            <td>{director.Male ? "true" : "false"}</td>
                            <td>{director.Dob}</td>
                            <td>{director.Nationality}</td>
                            <td>{director.Description}</td>
                            <Button onClick={() => confirmDelete(director.id)}>Delete</Button>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
         
            <h2>Add Product Form</h2>
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Created Successfully!
                   
                </Alert>
            )}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>ID</Form.Label>
          <Form.Control type="number" value={id} onChange={(e) => setId(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>FullName</Form.Label>
          <Form.Control type="text" value={FullName} onChange={(e) => setFullName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Male</Form.Label>
          <Form.Control type="text" value={Male} onChange={(e) => setMale(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dob</Form.Label>
          <Form.Control type="Date" value={Dob} onChange={(e) => setDob(e.target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Nationality</Form.Label>
          <Form.Control type="text" value={Nationality} onChange={(e) => setNationality(e.target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={Description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button type="button" onClick={createPost}>Add Product</Button>
      </Form>
        </Container>
    );
};

export default Directors;