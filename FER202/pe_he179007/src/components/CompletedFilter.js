import { Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function CompletedFilter() {

    return (
        <Row>
            <Col>
                <h3>Completed</h3>
                <Form.Check
                    type="radio"
                    label="All"
                    name="completedFilter"
                    value=""
                />
                <Form.Check
                    type="radio"
                    label="Finished"
                    name="completedFilter"
                    value="true"
                />
                <Form.Check
                    type="radio"
                    label="Unfinished"
                    name="completedFilter"
                    value="false"
                />
            </Col>
        </Row>
    )
}

