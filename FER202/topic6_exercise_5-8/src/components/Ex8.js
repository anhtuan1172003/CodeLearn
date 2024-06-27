import { Container, Col, Row, Form, InputGroup, Button } from "react-bootstrap"
export default function Ex8() {
    return (
        <Container style={{maxWidth: "500px"}}>
            <Row className="mb-3">
                <Col>
                    <Form.Label>Họ Tên</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1"><i class="bi bi-person"></i></InputGroup.Text>
                        <Form.Control placeholder="Họ Tên" />
                        <InputGroup.Text id="basic-addon2">vnđ</InputGroup.Text>
                    </InputGroup>
                    <a style={{ paddingLeft: "50px" }}>Phải nhập 5 kí tự, in hoa</a>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <p>Địa chỉ</p>
                    <InputGroup>
                        <Form.Control type="address" />
                    </InputGroup>
                    <a style={{ paddingLeft: "50px" }}>Phải nhập 5 kí tự, in hoa</a>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group controlId="formGridFrom">
                        <Form.Label>Đi từ</Form.Label>
                        <Form.Control as="select">
                            <option>Hà nội</option>
                            <option>TP. Hồ Chí Minh</option>
                            <option>Đà Nẵng</option>
                            <option>Cần Thơ</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formGridTo">
                        <Form.Label>Đến</Form.Label>
                        <Form.Control as="select">
                            <option>Hà nội</option>
                            <option>TP. Hồ Chí Minh</option>
                            <option>Đà Nẵng</option>
                            <option>Cần Thơ</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <InputGroup className="mb-3">
                    <Form.Check type="checkbox" label="Đi" />
                </InputGroup>
                <InputGroup>
                    <Form.Check type="checkbox" label="Đi" />
                </InputGroup>
            </Row>
            <Button variant="primary">
                Submit
            </Button>
        </Container>
    )
}