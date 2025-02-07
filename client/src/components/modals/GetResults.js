import React, { useContext, useEffect, useState } from 'react';
import { Modal, Dropdown, Button } from 'react-bootstrap';
import axios from 'axios';
import { Context } from '../..';

const GetResults = ({ show, onHide }) => {
  const [results, setResults] = useState([]);
  const { device } = useContext(Context);

  useEffect(() => {
    let integer = device.selectedDevice.id
    axios.get(`${process.env.REACT_APP_API_URL}api/testResult/${integer}`)
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the survey results!', error);
      });
  }, [device.devices]); // Добавляем зависимость от device.devices

  const getResult = () => {
    console.log(results);//Тута надо что-то делать!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <h2>Survey Results</h2>
      <Dropdown className="mt-2 mb-2">
        <Dropdown.Toggle>{device.selectedDevice.name || "Выберите опрос"}</Dropdown.Toggle>
        <Dropdown.Menu>
          {Array.isArray(device.devices) && device.devices.map(deviceItem =>
            <Dropdown.Item
              onClick={() => device.setSelectedDevice(deviceItem)}
              key={deviceItem.id}
            >
              {deviceItem.name}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={getResult}>Посмотреть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GetResults;