import React, {useState, useEffect, useContext} from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {fetchOneDevice} from "../http/deviceAPI";
import {createTestResult} from "../http/testResultAPI";
import { fetchOneUser } from '../http/userAPI';
import {Context} from "../index";

const DevicePage = () => {
    const {id} = useParams()
    const {user} = useContext(Context)
    const [device, setDevice] = useState({info: []})
    const [answers, setAnswers] = useState({})
    const [yes, setYes] = useState(true);

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [id])

    useEffect(() => {
        fetchOneUser(user.user.id).then(data => user.setUser(data))
    }, [user.user.id])
    
    const handleAnswerChange = (index, value) => {
        setAnswers({...answers, [index]: value})
    }

    const handleMultipleAnswerChange = (index, value) => {
        const currentAnswers = answers[index] || []
        if (currentAnswers.includes(value)) {
            setAnswers({...answers, [index]: currentAnswers.filter(answer => answer !== value)})
        } else {
            setAnswers({...answers, [index]: [...currentAnswers, value]})
        }
    }

    const handleSubmit = () => {
        const userId = user.user.id
        createTestResult({deviceId: id, userId, answers}).then(data => {
            console.log('Ответы сохранены', data)
        })
    }

    return (
        <Container className="mt-3">
            <Row className="d-flex flex-column m-3">
                <h1>{device.name}</h1>
                {device.info.map((info, index) => (
                    <Col key={info.id} className="mt-4">
                        <Row style={{background:'lightgray', padding: 10}}>
                            {index + 1} {info.title} "{info.count}"
                        </Row>
                        {info.count === 'один вариант ответа' ? (
                            <>
                                <Row>
                                    <input type='radio' name={index} value="description1" onChange={(e) => handleAnswerChange(index, e.target.value)} />
                                    {info.description1}
                                </Row>
                                <Row>
                                    <input type='radio' name={index} value="description2" onChange={(e) => handleAnswerChange(index, e.target.value)} />
                                    {info.description2}
                                </Row>
                                <Row>
                                    <input type='radio' name={index} value="description3" onChange={(e) => handleAnswerChange(index, e.target.value)} />
                                    {info.description3}
                                </Row>
                                <Row>
                                    <input type='radio' name={index} value="description4" onChange={(e) => handleAnswerChange(index, e.target.value)} />
                                    {info.description4}
                                </Row>
                            </>
                        ) : (
                            <>
                                <Row>
                                    <input type='checkbox' value="description1" onChange={(e) => handleMultipleAnswerChange(index, e.target.value)} />
                                    {info.description1}
                                </Row>
                                <Row>
                                    <input type='checkbox' value="description2" onChange={(e) => handleMultipleAnswerChange(index, e.target.value)} />
                                    {info.description2}
                                </Row>
                                <Row>
                                    <input type='checkbox' value="description3" onChange={(e) => handleMultipleAnswerChange(index, e.target.value)} />
                                    {info.description3}
                                </Row>
                                <Row>
                                    <input type='checkbox' value="description4" onChange={(e) => handleMultipleAnswerChange(index, e.target.value)} />
                                    {info.description4}
                                </Row>
                            </>
                        )}
                    </Col>
                ))}
            </Row>
            {yes === true ? (
            <Button onClick={() => { alert("Спасибо за прохождение опроса"); handleSubmit(); setYes(false); }}>
            Завершить опрос
            </Button>
            ) : (
            <a>Спасибо за прохождение опроса</a>
            )}
        </Container> 
    );
};

export default DevicePage;