import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const JudgeFormModal = ({ showModal, handleClose, id, refreshData }) => {
    const [judge, setJudge] = useState({ name: '' });

    useEffect(() => {
        if (id) {
            axios.get(`https://localhost:7071/api/Judge/${id}`)
                .then(response => setJudge(response.data))
                .catch(error => console.error('Error fetching judge details:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJudge({ ...judge, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = id ? axios.put : axios.post;
        const url = id ? `https://localhost:7071/api/Judge/${id}` : 'https://localhost:7071/api/Judge';

        request(url, judge)
            .then(() => {
                handleClose();
                refreshData();
            })
            .catch(error => {
                console.error(`There was an error ${id ? 'updating' : 'creating'} the judge!`, error);
            });
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Editar Juez' : 'Crear Juez'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formJudgeName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={judge.name}
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

export default JudgeFormModal;
