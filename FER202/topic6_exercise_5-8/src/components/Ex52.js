import { Container, Col, Row, Image } from "react-bootstrap"
export default function Ex52() {
    return(
        <Container>
            <Row style={{backgroundColor: "grey"}}>
                <Col>
                <h1 style={{lineHeight: "100px"}}>My First bootstrap page</h1>
                </Col>
            </Row>
            <Row style={{padding: "30px 0px"}}>
                <Col>
                {/* <img src="image/image1.jpg" style={{with: "80%"}}/> */}
                <Image src="image/image1.jpg" rounded width="80%"/>
                </Col>
                <Col>
                {/* <img src="image/image2.jpg" style={{with: "80%"}}/> */}
                <Image src="image/image2.jpg" rounded width="80%"/>
                </Col>
                <Col>
                {/* <img src="image/image3.svg" style={{with: "80%"}}/> */}
                <Image src="image/image3.svg" rounded width="80%"/>
                </Col>
            </Row>

        </Container>
    )
    
}