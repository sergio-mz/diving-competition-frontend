import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DiveDetailModal = ({ showModal, handleClose, id }) => {
    const [dive, setDive] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`https://localhost:7071/api/Dive/${id}`)
                .then(response => setDive(response.data))
                .catch(error => console.error('Error fetching dive details:', error));
        }
    }, [id]);

    if (!dive) {
        return null;
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Clavado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Nombre: {dive.name}</p>
                {/* Añadir otros detalles del Clavado si los hay */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DiveDetailModal;
