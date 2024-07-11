import { Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function UserFilter() {

    const [userName, setUserName] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/user`)
            .then(res => res.json())
            .then(data => setUserName(data))
            .catch(e => console.log(e));
    }, []);
    return (
        <Row>
            <Col>
                <h3>Users</h3>
                {userName.map(user =>
                    <Form.Check key={user.id}
                        type="checkbox"
                        label={user.name}
                        value={user.id} />
                )}
            </Col>
        </Row>
    )
}