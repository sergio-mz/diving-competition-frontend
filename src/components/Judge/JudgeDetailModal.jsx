import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const JudgeDetailModal = ({ showModal, handleClose, id }) => {
    const [judge, setJudge] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`https://localhost:7071/api/Judge/${id}`)
                .then(response => setJudge(response.data))
                .catch(error => console.error('Error fetching judge details:', error));
        }
    }, [id]);

    if (!judge) {
        return null;
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Juez</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Nombre: {judge.name}</p>
                {/* Añadir otros detalles del juez si los hay */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default JudgeDetailModal;
