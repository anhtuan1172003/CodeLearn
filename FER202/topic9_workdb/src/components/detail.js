import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Detail() {
    //Lay gia  tri cua tham so tren URL
    const {pid} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:9999/products/${pid}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(e => console.log(e));
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Product Details</h3>
                    <div>Product Id:{product?.id}</div>
                    <div>Product Name:{product?.name}</div>
                    <div>Price:{product?.price}</div>
                    <div>Description:{product?.description}</div>
                    <div>Category:{product?.category}</div>
                    <div>Brands: {product?.brands?.map (b=>{return<span>{b.name}<br/></span>})}</div>
                </Col>
            </Row>
        </Container>
    )
}