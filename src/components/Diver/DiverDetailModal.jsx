import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DiverDetailModal = ({ showModal, handleClose, id }) => {
    const [diver, setDiver] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`https://localhost:7071/api/Diver/${id}`)
                .then(response => setDiver(response.data))
                .catch(error => console.error('Error fetching diver details:', error));
        }
    }, [id]);

    if (!diver) {
        return null;
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Clavadista</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Nombre: {diver.name}</p>
                {/* Añadir otros detalles del Clavadista si los hay */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DiverDetailModal;
