import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, } from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description1: '', description2: '', description3: '', description4: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить опрос
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название опроса"
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новый вопрос
                    </Button>
                    {info.map(i =>
                        <Col className="mt-4" key={i.number}>
                            <Col className="mt-2 mb-2">
                                <Dropdown className="mt-2 mb-2">
                                    <Dropdown.Toggle>{i.count || "Выберите тип"}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                    {device.counts.map(count => 
                                            <Dropdown.Item
                                            onClick={(e) => {
                                                device.setSelectedCount(count);
                                                changeInfo('count', count.name, i.number);
                                              }}
                                            
                                                key={i.count}
                                            >
                                            {count.name}
                                            </Dropdown.Item>
                                    )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col className="mt-2 mb-2">
                            <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите вопрос"
                                />
                            </Col>
                            <Col className="mt-2 mb-2">
                                <Form.Control
                                    value={i.description1}
                                    onChange={(e) => changeInfo('description1', e.target.value, i.number)}
                                    placeholder="Введите варинты ответа(1)"
                                />
                            </Col>
                            <Col className="mt-2 mb-2">
                                <Form.Control
                                    value={i.description2}
                                    onChange={(e) => changeInfo('description2', e.target.value, i.number)}
                                    placeholder="Введите варинты ответа(2)"
                                />
                            </Col>
                            <Col className="mt-2 mb-2">
                                <Form.Control
                                    value={i.description3}
                                    onChange={(e) => changeInfo('description3', e.target.value, i.number)}
                                    placeholder="Введите варинты ответа(3)"
                                />
                            </Col>
                            <Col className="mt-2 mb-2">
                                <Form.Control
                                    value={i.description4}
                                    onChange={(e) => changeInfo('description4', e.target.value, i.number)}
                                    placeholder="Введите варинты ответа(4)"
                                />
                            </Col>
                            <Col className="mt-2 mb-2">
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Col>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;
