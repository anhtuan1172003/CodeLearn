import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function CreateProduct() {
    const redirect = useNavigate();
    const [categories, setCategories] = useState([]);
    const [pName, setPName] = useState("");
    const [pPrice, setPPrice] = useState(0);
    const [pDesc, setPDesc] = useState("");
    const [catId, setCatId] = useState("0");

    useEffect(() => {

        //GER - URI: http://localhost:9999/categories
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result))
            .catch(error => console.log(error));
    }, []);

    function handleCreate(e){
        //ngan chan reload page khi click vao create
        e.preventDefault();
        //check for input
        let message ="";
        let status = true;
        if(pName.length == 0){
            message += "Product name is required \n";
            status = false;
        }
        if(catId == 0){
            message += "You are must be choose a category\n";
            status = false;
        }
        if(status == false || message.length>0)
            alert(message);
        else{
            const newProduct = {
                name: pName,
                price: pPrice,
                description: pDesc,
                category: catId
            };
    
            fetch ("http://localhost:9999/products", {
                method: "POST",
                body: JSON.stringify(newProduct),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
            .then(resp => resp.json())
            .then(productCreated =>{
                alert("Created successful! Id:" + productCreated.id);
                redirect("/product");
            })
            .catch(err=> console.log(err));
        }
    }


    return (
        <Container>
            <Row>
                <Col><h3 style={{ textAlign: "center" }}>Create new Product</h3></Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/product">Back to list</Link>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Id</Form.Label>
                        <Form.Control disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control onChange={e => setPName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" min={0} max={100000000} onChange={e => setPPrice(parseInt(e.target.value))} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={e => setPDesc(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select onChange={e => setCatId(parseInt(e.target.value))}>
                            <option value="0">--Select category--</option>
                            {
                                categories?.map(c => (
                                    <option value={c.id} key={c.id}>{c.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button onClick={e=>handleCreate(e)}>Create</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    )
}