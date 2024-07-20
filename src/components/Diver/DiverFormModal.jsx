import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const DiverFormModal = ({ showModal, handleClose, id, refreshData }) => {
    const [diver, setDiver] = useState({ name: '' });

    useEffect(() => {
        if (id) {
            axios.get(`https://localhost:7071/api/Diver/${id}`)
                .then(response => setDiver(response.data))
                .catch(error => console.error('Error fetching diver details:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiver({ ...diver, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = id ? axios.put : axios.post;
        const url = id ? `https://localhost:7071/api/Diver/${id}` : 'https://localhost:7071/api/Diver';

        request(url, diver)
            .then(() => {
                handleClose();
                refreshData();
            })
            .catch(error => {
                console.error(`There was an error ${id ? 'updating' : 'creating'} the diver!`, error);
            });
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Editar Clavadista' : 'Crear Clavadista'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDiverName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={diver.name}
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

export default DiverFormModal;
