// components/Competition/CompetitionFormModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CompetitionForm from './CompetitionForm';

const CompetitionFormModal = ({ showModal, handleClose, competitionId, refreshCompetitions }) => {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{competitionId ? 'Editar Competición' : 'Crear Competición'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CompetitionForm competitionId={competitionId} handleClose={handleClose} refreshCompetitions={refreshCompetitions} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CompetitionFormModal;
