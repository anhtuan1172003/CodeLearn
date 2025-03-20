import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table, FormCheck } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [catId, setCatId] = useState("all");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [brands, setBrands] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000000);

    useEffect(() => {
        // GET - URI: http://localhost:9999/products
        fetch("http://localhost:9999/products")
            .then(res => res.json())
            .then(result => {
                let filteredProducts = result;

                if (catId !== "all") {
                    filteredProducts = filteredProducts.filter(p => p.category === catId);
                }

                if (search.length > 0) {
                    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
                }
                if (selectedBrands.length > 0) {
                    filteredProducts = filteredProducts.filter(p =>
                        selectedBrands.some(sb => p.brands.some(b => b.id === sb))
                    );
                }

                filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);

                setProducts(filteredProducts);
            })
            .catch(error => console.log(error));

        // GET - URI: http://localhost:9999/categories
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result))
            .catch(error => console.log(error));
        fetch("http://localhost:9999/products")
            .then(res => res.json())
            .then(result => {
                const allBrands = result.flatMap(p => p.brands);
                const uniqueBrands = Array.from(new Set(allBrands.map(b => b.id)))
                    .map(id => allBrands.find(b => b.id === id));
                setBrands(uniqueBrands);
            })
            .catch(error => console.log(error));


    }, [catId, search, selectedBrands, minPrice, maxPrice]);
    function handleDelete(pid) {
        if (window.confirm("Do you want delete")) {
            fetch("http://localhost:9999/products/" + pid, { method: "DELETE" });

            alert("Delete success");
            window.location.reload();

        }
    }
    const handleBrandChange = (brandId, checked) => {
        if (checked) {
            setSelectedBrands([...selectedBrands, brandId]);
        } else {
            setSelectedBrands(selectedBrands.filter(id => id !== brandId));
        }
    };



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
                                    <option value="all" key={0}>-- All --</option>
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
                                <Form.Label> Price: {minPrice}</Form.Label>
                                <Form.Range
                                    min={0}
                                    max={100000000}
                                    value={minPrice}
                                    onChange={e => setMinPrice(Number(e.target.value))}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col><h5>By Brands</h5></Col>
                        </Row>
                        <Row>
                            <Col>
                            {brands?.map(brand => (
                                    <FormCheck
                                        key={brand.id}
                                        type="checkbox"
                                        id={`brand-${brand.id}`}
                                        label={brand.name}
                                        onChange={e => handleBrandChange(brand.id, e.target.checked)}
                                    />
                                ))}

                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col md={9}>
                    <Container fluid>
                        <Row>
                            <Col><h2>List of Products</h2></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Control placeholder="Enter product name to search ..."
                                        onChange={e => setSearch(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col style={{ textAlign: "right" }}>
                                <Link to={"/product/create"} className="btn btn-success">Create new a product
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th>ID</th><th>Name</th><th>Price</th><th>Description</th><th>Brands</th><th>Category</th>
                                            <th colSpan={2}>Function</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products?.map(p => (
                                                <tr key={p.id}>
                                                    <td>{p.id}</td>
                                                    <td>
                                                        <Link to={`/product/${p.id}`}>
                                                            {p.name}
                                                        </Link>
                                                    </td>
                                                    <td>{p.price}</td>
                                                    <td>{p.description}</td>
                                                    <td>
                                                        
                                                        {
                                                            p.brands?.map(b => {
                                                                return <span key={b.id}>{b.name}<br /></span>
                                                                
                                                            })
                                                        }
                                                        <Link to={`/product/addbrands/${p.id}`} className="btn btn-success">Add
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {
                                                            categories?.find(c => c.id == p.category)?.name
                                                        }
                                                    </td>
                                                    <td>
                                                        <Link to={"/product/edit/" + p.id}>Edit</Link>
                                                    </td>
                                                    <td>
                                                        <Link to={'#'} onClick={() => handleDelete(p.id)}>Delete</Link>
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