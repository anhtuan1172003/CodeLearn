import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import '../index.css';
import UserFilter from './UsersFilter';

export default function TodoList() {
    const [todo, setTodo] = useState([]);
    const [users, setUsers] = useState([]);



    useEffect(() => {
        fetch(`http://localhost:9999/user`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(e => console.log(e));
        fetch('http://localhost:9999/todo')
            .then(res => res.json())
            .then(data => setTodo(data))
            .catch(e => console.log(e));
    }, []);

    return (
        <Container>
            <h1>TODO LIST</h1>
            <Row>
                <Col md={9}>
                    <Row>
                        <h4>Sort:
                            <Button className="mb-3">
                                Ascending by Title
                            </Button>
                        </h4>

                    </Row>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Title</th>
                                <th>User</th>
                                <th>Completed</th>
                                <th>Change Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todo.map(todo => {
                                const user = users.find(user => user.id == todo.userId);
                                return (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.title}</td>
                                        <td>{user.name}</td>
                                        <td>{todo.completed ? 'Finished' : 'Unfinished'}</td>
                                        <td><Button variant="primary">Change</Button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
