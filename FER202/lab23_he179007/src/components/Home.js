import { Container, Row, Col, Nav, Form, Image, Navbar, Button, Carousel, Card, InputGroup } from "react-bootstrap";
import './Home.css'
const students = [
    { id: 'DABC Pizza', name: '$123', imgSrc: 'image/pizza1.jpeg' },
    { id: 'DABC Pizza', name: '$143', imgSrc: 'image/pizza2.jpeg' },
    { id: 'DABC Pizza', name: '$1873', imgSrc: 'image/pizza3.jpeg' },
    { id: 'DABC Pizza', name: '$113', imgSrc: 'image/pizza4.jpeg' }
];
export default function Home() {
    return (
        <Container>
            <Row>
                <Col style={{ backgroundColor: "#333333" }}>
                    <Navbar expand="lg" style={{ backgroundColor: "#333333" }}>
                        <Container fluid>
                            <Navbar.Brand href="#" style={{ color: "white"}}>Pizza House</Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                    <Nav.Link href="#action1" style={{ color: "white"}}>Home</Nav.Link>
                                    <Nav.Link href="#action2" style={{ color: "white"}}>About us</Nav.Link>
                                    <Nav.Link href="#action2" style={{ color: "white"}}>Contact</Nav.Link>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
            <Row style={{ backgroundColor: "#333333" }}>
                <Carousel>
                    <Carousel.Item>
                        <Image src="image/banner1.jpg" fluid />
                        <Carousel.Caption>
                            <h3>Napolitan Pizza</h3>
                            <p>If you looking for traditional...</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src="image/banner2.jpg" fluid />
                        <Carousel.Caption>
                            <h3>Napolitan Pizza</h3>
                            <p>If you looking for traditional...</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src="image/banner3.jpg" fluid />
                        <Carousel.Caption>
                            <h3>Napolitan Pizza</h3>
                            <p>If you looking for traditional...</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Row>
            <Row style={{ backgroundColor: "#333333" }}><h2 style={{ textAlign: "Left" }}>Our Menu</h2></Row>
            <Row sm={2} xs={1} md={4} className="g-4" style={{ backgroundColor: "#333333" }}>
                {students.map((student) => (
                    <Col style={{ textAlign: "center" }}>
                        <Card>
                            <div className="card-img-container">
                                <Card.Img variant="top" src={student.imgSrc} className="card-img" />
                            </div>
                            <Card.Body>
                                <Card.Text>{student.id}</Card.Text>
                                <Card.Text className="d-flex justify-content-between">
                                    <span>{student.name}</span>
                                </Card.Text>
                                <Button variant="primary" type="submit" style={{ backgroundColor: "#333333", maxWidth: "100%" }}>
                                    Buy
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row style={{ backgroundColor: "#333333", textAlign: "center" }}>
                    <Row className="mb-3"><h2>Book</h2></Row>
                    <Row sm={1} xs={1} md={3} className="mb-3">
                        <Col>
                            <InputGroup>
                                <Form.Control placeholder="Name" />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup>
                                <Form.Control placeholder="Mail" />
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Group controlId="formGridFrom" placeholder="Select service">
                                <Form.Control as="select">
                                    <option>Select service</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <InputGroup>
                                <Form.Control placeholder="Detail" style={{ lineHeight: "200px"}}/>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Button variant="primary" style={{ backgroundColor: "orange", maxWidth: "200px" }}>
                        Send message
                    </Button>
            </Row>
        </Container >
    )
}