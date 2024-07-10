import { Row, Col, Image } from 'react-bootstrap';
export default function Main2() {
    return (
        <Row className='Main2'>
            <Col><Image src="image/image1.jpg" rounded  class="img-fluid"/></Col>
            <Col><Image src="image/image2.jpg" rounded  class="img-fluid"/></Col>
            <Col><Image src="image/image3.svg" rounded  class="img-fluid"/></Col>
        </Row>
    )
}