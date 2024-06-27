import { Container, Col, Row, Nav, Navbar, Form, Image, Breadcrumb, Card, Button } from "react-bootstrap"
import './Ex55.css'
const students = [
  { id: 'DE160182', name: 'Nguyen Van A', location: 'DaNang', imgSrc: 'image/image1.jpg' },
  { id: 'DE160377', name: 'Nguyen Van B', location: 'QuangNam', imgSrc: 'image/image3.svg' },
  { id: 'DE160547', name: 'Nguyen Van C', location: 'QuangNam', imgSrc: 'image/image2.jpg' },
  { id: 'DE170049', name: 'Nguyen Van D', location: 'DaNang', imgSrc: 'image/image1.jpg' }
];
export default function Ex55() {
  return (
    <Container>
      <Row>
        <Col style={{ backgroundColor: "#eacdad" }}>
          <Navbar expand="lg">
            <Container>
              <Col><Navbar.Brand href="#"><Image src="image/FPT.png" width="100%" /></Navbar.Brand></Col>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
                >
                  <Nav.Link href="#action1" style={{ color: "#f38f31", fontWeight: "bold" }}><i class="bi bi-house-door"></i>Trang chủ</Nav.Link>
                  <Nav.Link href="#action2" style={{ color: "#f38f31", fontWeight: "bold" }}><i class="bi bi-info-square-fill"></i>Ngành học</Nav.Link>
                  <Nav.Link href="#action1" style={{ color: "#f38f31", fontWeight: "bold" }}><i class="bi bi-person-lines-fill"></i>Tuyển sinh</Nav.Link>
                  <Nav.Link href="#action2" style={{ color: "#f38f31", fontWeight: "bold" }}><i class="bi bi-list-task"></i>Sinh viên</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <p style={{ margin: "auto 0" }}>Search: </p>
                  <Form.Control type="search" />
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Image src="image/Image center.png" style={{ padding: "5%", backgroundColor: "#f38f31" }} fluid />
      </Row>
      <Row>
        <Breadcrumb className="d-flex">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Students</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Container style={{ maxWidth: "90%" }}>
        <Row><h2 style={{ textAlign: "center" }}>Students Details</h2></Row>
        <Row md={2} className="g-4">
          {students.map((student, idx) => (
            <Col key={idx} style={{ textAlign: "center" }}>
              <Card>
                <div className="card-img-container">
                  <Card.Img variant="top" src={student.imgSrc} className="card-img" />
                </div>
                <Card.Body>
                  <Card.Text>{student.id}</Card.Text>
                  <Card.Text className="d-flex justify-content-between">
                    <span>{student.name}</span>
                    <span>{student.location}</span>
                  </Card.Text>
                  <Form style={{ maxWidth: "80%", textAlign: "center" }}>
                    <Row style={{ textAlign: "center" }}>
                      <Col><Form.Check type="radio" label="Absent" name={`attendance${idx}`} /></Col>
                      <Col><Form.Check type="radio" label="Present" name={`attendance${idx}`} /></Col>
                    </Row>
                  </Form>
                  <Button variant="primary" type="submit" style={{ backgroundColor: "orange" }}>
                    Submit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <br />
      <Row className="footer-container" style={{ backgroundColor: "#f38f31", textAlign: "center", paddingTop: "20px" }}>
        <Row style={{ maxWidth: "90%", margin: "0 auto" }}>
          <Col style={{ textAlign: "left" }}>
            <h2>Our Address</h2>
            <p>
              <a>Khu đô thị FPT Đà Nẵng</a><br/>
              <a><i class="bi bi-telephone"></i>0396835513</a><br/>
              <a><i class="bi bi-voicemail">+11113131</i></a><br/>
              <a href="#"><i class="bi bi-envelope"></i>tuantahe179007@fpt.edu.vn</a>
          </p>
        </Col>
        <Col style={{ paddingTop: "5%" }}>
          <h2><i class="bi bi-google">  </i>
            <i class="bi bi-facebook">  </i>
            <i class="bi bi-linkedin">  </i>
            <i class="bi bi-twitter">  </i>
            <i class="bi bi-youtube">  </i>
            <i class="bi bi-envelope">  </i></h2>
        </Col>
      </Row>
      <p>© Copyright 2023</p>
    </Row>
    </Container >
  )
}