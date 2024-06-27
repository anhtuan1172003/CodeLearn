import { Container, Col, Row } from "react-bootstrap"
import './Ex51.css'
export default function Ex51() {
    return (
        <Container>
            <Row style={{ backgroundColor: "grey" }}>
                <Col>
                    <h1 style={{ lineHeight: "100px" }}>Let's test the grid</h1>
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