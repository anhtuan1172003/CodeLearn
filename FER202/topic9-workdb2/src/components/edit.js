import { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [pName, setPName] = useState("");
    const [pPrice, setPPrice] = useState(0);
    const [pDesc, setPDESC] = useState("");
    const [catId, setCatId] = useState("0");
    useEffect(() => {
        // Fetch categories
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result))
            .catch(error => console.log(error));
        
        // Fetch product details
        fetch(`http://localhost:9999/products/${id}`)
            .then(res => res.json())
            .then(product => {
                setPName(product.name);
                setPPrice(product.price);
                setPDESC(product.description);
                setCatId(product.category);
            })
            .catch(error => console.log(error));
    }, [id]); 
            
    function handleUpdate(e) {
        e.preventDefault();
        let message = "";
        let status = true;
        if (pName.length === 0) {
            message += "Product name is required\n";
            status = false;
        }
        if (catId === 0) {
            message += "You must choose a category!";
            status = false;
        }
        if (!status) {
            alert(message);
        } else {
            const updatedProduct = {
                name: pName,
                price: pPrice,
                description: pDesc,
                category: catId
                
            };
            fetch(`http://localhost:9999/products/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(updatedProduct)
            })
                .then(resp => resp.json())
                .then(productUpdated => {
                    alert("Update success! Id: " + productUpdated.id);
                    navigate("/product");
                })
                .catch(err => console.log(err));
        }
    }
    

    return (
        <Container>
            <Row>
                <Col>
                    <h3 style={{ textAlign: "center" }}>Edit Product</h3>
                </Col>
                <hr />
                <Col>
                    <Link to="/product">Back to List</Link>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>ID</Form.Label>
                        <Form.Control value={id} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control value={pName} onChange={e => setPName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" min={0} max={10000000} value={pPrice}
                            onChange={e => setPPrice(parseInt(e.target.value))} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={pDesc}
                            onChange={e => setPDESC(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={catId} onChange={e => setCatId(parseInt(e.target.value))}>
                            <option value="0">-- Select a category</option>
                            {categories?.map(c => (
                                <option value={c.id} key={c.id}>{c.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Button onClick={handleUpdate}>Update</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
}