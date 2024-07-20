import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const DiveFormModal = ({ showModal, handleClose, id, refreshData }) => {
    const [dive, setDive] = useState({ diveCode: '', group: '', height: '', difficulty: '' });
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        if (id) {
            axios.get(`https://localhost:7071/api/Dive/${id}`)
                .then(response => setDive(response.data))
                .catch(error => console.error('Error fetching dive details:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDive({ ...dive, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = id ? axios.put : axios.post;
        const url = id ? `https://localhost:7071/api/Dive/${id}` : 'https://localhost:7071/api/Dive';

        request(url, dive)
            .then(() => {
                handleClose();
                refreshData();
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    setErrorMessage('Ya existe un clavado con el mismo código, grupo y altura.');
                } else {
                    console.error(`There was an error ${id ? 'updating' : 'creating'} the dive!`, error);
                }
            });
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Editar Clavado' : 'Crear Clavado'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDiveCode">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="text"
                            name="diveCode"
                            value={dive.diveCode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDiveGroup">
                        <Form.Label>Grupo</Form.Label>
                        <Form.Control
                            type="text"
                            name="group"
                            value={dive.group}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDiveHeight">
                        <Form.Label>Altura</Form.Label>
                        <Form.Control
                            type="text"
                            name="height"
                            value={dive.height}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDiveDifficulty">
                        <Form.Label>Dificultad</Form.Label>
                        <Form.Control
                            type="text"
                            name="difficulty"
                            value={dive.difficulty}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        {id ? 'Actualizar' : 'Crear'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DiveFormModal;
