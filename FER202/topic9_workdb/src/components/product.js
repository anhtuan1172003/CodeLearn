import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [catId, setCatId] = useState("all");
    const [pPrice, setPPrice] = useState(100000000);
    const [pBrand, setPBrand] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(pBrand);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        //GER - URI: http://localhost:9999/products
        fetch("http://localhost:9999/products")
            .then(res => res.json())
            .then(result => {

                const uniqueBrands = new Set();
                result.forEach(p => {
                    if (p.brands && p.brands.length > 0) {
                        p.brands.forEach(b => uniqueBrands.add(b.name));
                    }
                });
                uniqueBrands.add("Khác"); // Add "Khác" to the brands list
                setPBrand(Array.from(uniqueBrands));

                let filteredProducts = result;
                if (catId != "all") {
                    if (search.length > 0)
                        filteredProducts = filteredProducts.filter(p => p.category == catId && p.name.toLowerCase().includes(search.toLowerCase()) && p.price <= pPrice)
                    else
                        filteredProducts = filteredProducts.filter(p => p.category == catId && p.price <= pPrice)
                    // setProducts(result.filter(p => p.category == catId))
                }
                else {
                    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && p.price <= pPrice);
                }

                setProducts(filteredProducts);
            })
            .catch(error => console.log(error));

        //GER - URI: http://localhost:9999/categories
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result))
            .catch(error => console.log(error));

    }, [catId, search, pPrice]);


    //handle delete action

    function handleDelete(id) {
        if (window.confirm("Do you want to delete?")) {
            fetch("http://localhost:9999/products/" + id, { method: "DELETE" });
            alert("Delete success");
            window.location.reload();
        }
    }

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <Container fluid>
                        <Row>
                            <Col><h3>Filter:</h3></Col>
                        </Row>
                        <Row>
                            <Col><h5>By Category</h5></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Select onChange={e => setCatId(e.target.value)}>
                                    <option value="all" key={0}>--All--</option>
                                    {
                                        categories?.map(c => (
                                            <option value={c.id} key={c.id}>{c.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col><h5>By Price</h5></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Range onChange={e => setPPrice(e.target.value)} min={0} max={100000000} value={pPrice} />
                            </Col>
                        </Row>
                        <Row>
                            <Col><h5>By Brands</h5></Col>
                        </Row>
                        <Row>
                            <Col>
                                {pBrand?.map(brand =>
                                    <Form.Check key={brand}
                                        type="checkbox"
                                        label={brand}
                                        value={brand}
                                        />
                                )}

                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                        </Row>
                    </Container>
                </Col>
                <Col md={9}>
                    <Container fluid>
                        <Row>
                            <Col><h2>List of Product</h2></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Control placeholder="Enter name to search   "
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col style={{ textAlign: "right" }}>
                                <Link to={"/product/create"} className="btn btn-success">Create new product</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th>ID</th><th>Name</th><th>Price</th><th>Description</th><th>Brands</th><th>Category</th><th colspan="2">Functions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products?.map(p => (
                                                <tr key={p.id}>
                                                    <td>{p.id}</td>
                                                    <td>
                                                        <Link to={`/product/${p.id}`}>{p.name}</Link>
                                                    </td>
                                                    <td>{p.price}</td>
                                                    <td>{p.description}</td>
                                                    <td>
                                                        {
                                                            p.brands?.map(b => {
                                                                return <span>{b.name}<br /></span>
                                                            })
                                                        }
                                                        <Button variant="primary" onClick={handleShow}>
                                                            Update
                                                        </Button>

                                                        <Modal show={show} onHide={handleClose} animation={false}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Brands</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                {pBrand?.map(brand =>
                                                                    <Form.Check key={brand}
                                                                        type="checkbox"
                                                                        label={brand}
                                                                        value={brand} 
                                                                        />
                                                                )}
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" onClick={handleClose}>
                                                                    Close
                                                                </Button>
                                                                <Button variant="primary" onClick={handleClose}>
                                                                    Save Changes
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </td>
                                                    <td>
                                                        {
                                                            categories?.find(c => c.id == p.category)?.name
                                                        }
                                                    </td>
                                                    <td>
                                                        <Link to={`/product/edit/${p.id}`}>Edit</Link>
                                                    </td>
                                                    <td>
                                                        <Link to='#' onClick={() => handleDelete(p.id)}>Delete</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}