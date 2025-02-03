import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row className="d-flex flex-column m-3">
                <h1>{device.name}</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title} : {info.description1} {info.description2} {info.description3} {info.description4}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
