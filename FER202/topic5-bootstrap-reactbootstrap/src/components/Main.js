import { Row, Col } from 'react-bootstrap';
//tạo 1 components đặt tên Main(trùng tên module Main.js)
export default function Main() {
    return (
        // <div className='row'>
        //     <div className='col-md-3 d-sm-none d-none d-md-block'>Left</div>
        //     <div className='col-md-6'>Main</div>
        //     <div className='col-md-3 d-sm-none d-none d-md-block'>Right</div>
        // </div>

        <Row>
            <Col md={3} className='d-sm-none d-none d-md-block'>Left</Col>
            <Col>Main</Col>
            <Col md={3} className='d-sm-none d-none d-md-none d-lg-block'>Right</Col>
        </Row>
    )
}