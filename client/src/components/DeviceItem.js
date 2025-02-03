import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const history = useHistory()
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Row>
                <Card style={{cursor: 'pointer', display: 'inline'}} border={"light"}>
                    <h2>{device.name}</h2>
                </Card>
            </Row>
        </Col>
    );
};

export default DeviceItem;
