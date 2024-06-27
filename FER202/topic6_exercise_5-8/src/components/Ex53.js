import { Container, Col, Row, Nav } from "react-bootstrap"
import './Ex51.css'
export default function Ex53() {
    return (
        <Container>
            <Row style={{ backgroundColor: "grey" }}>
                <Col>
                    <h1 style={{ lineHeight: "100px" }}>Let's test the grid</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="/home"><i className="bi bi-1-square"></i>Active</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">Link</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">Link</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="disabled" disabled>
                                Disabled
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            <Row style={{ margin: "20px 0px" }}>
                <Col>
                    <Container style={{ width: "80%" }} className="table-content">
                        <Row>
                            <Col>FirstCol</Col>
                            <Col>SecondCol</Col>
                        </Row>
                        <Row>
                            <Col>Col</Col>
                            <Col>Col</Col>
                            <Col>Col</Col>
                        </Row>
                        <Row><Col>Col</Col>
                            <Col>Col</Col>
                            <Col>Col</Col>
                            <Col>Col</Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row style={{ backgroundColor: "lightgreen" }}>
                <h1 style={{ lineHeight: "40px", textAlign: "center" }}>Created by ABC!</h1>
            </Row>
        </Container>
    )
}