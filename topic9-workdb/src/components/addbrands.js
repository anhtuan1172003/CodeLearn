import { Container, Row, Col, FormCheck} from "react-bootstrap";
import React, { useEffect, useState } from "react";
export default function AddBrands(){
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    useEffect(() => {
        // Fetch brands from your API
        fetch("http://localhost:9999/brands") // Adjust URL based on your API endpoint
            .then(res => res.json())
            .then(data => setBrands(data))
            .catch(error => console.error("Error fetching brands:", error));
    }, []);

    // Handle brand checkbox change
    const handleBrandChange = (brandId, checked) => {
        if (checked) {
            setSelectedBrands([...selectedBrands, brandId]);
        } else {
            setSelectedBrands(selectedBrands.filter(id => id !== brandId));
        }
    };
    return(
        <Container>
            <Row>
                <Col>
                <h3 style={{ textAlign: "center" }}>List Brands</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    {brands.map(brand => (
                        <FormCheck
                            key={brand.id}
                            type="checkbox"
                            id={`brand-${brand.id}`}
                            label={brand.name}
                            checked={selectedBrands.includes(brand.id)}
                            onChange={e => handleBrandChange(brand.id, e.target.checked)}
                        />
                    ))}
                </Col>
            </Row>
        </Container>
    );
}