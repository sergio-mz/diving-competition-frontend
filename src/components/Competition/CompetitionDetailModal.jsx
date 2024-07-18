// components/Competition/CompetitionDetailModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CompetitionDetailModal = ({ showModal, handleClose, id }) => {
    const [competition, setCompetition] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`https://localhost:7071/api/Competition/${id}`)
                .then(response => setCompetition(response.data))
                .catch(error => console.error('Error fetching competition details:', error));
        }
    }, [id]);

    if (!competition) {
        return <div>Loading...</div>;
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles de la Competición</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2 className="my-4">{competition.name}</h2>
                <p>Date: {new Date(competition.date).toLocaleDateString()}</p>
                <h3>Divers</h3>
                <ul className="list-group">
                    {competition.competitionDivers.map(cd => (
                        <li key={cd.diver.diverId} className="list-group-item">{cd.diver.name}</li>
                    ))}
                </ul>
                <h3 className="mt-4">Judges</h3>
                <ul className="list-group">
                    {competition.competitionJudges.map(cj => (
                        <li key={cj.judge.judgeId} className="list-group-item">{cj.judge.name}</li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CompetitionDetailModal;
