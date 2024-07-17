// components/Competition/CompetitionList.js
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const CompetitionList = ({ competitions, onShowForm, onShowDetail, refreshCompetitions }) => {

    useEffect(() => {
        refreshCompetitions();
    }, [refreshCompetitions]);

    /* const refreshCompetitions = () => {
        axios.get('https://localhost:7071/api/Competition')
            .then(response => setCompetitions(response.data))
            .catch(error => console.error('Error fetching competitions:', error));
    }; */

    const handleDelete = (id) => {
        axios.delete(`https://localhost:7071/api/Competition/${id}`)
            .then(() => {
                refreshCompetitions();
            })
            .catch(error => {
                console.error('There was an error deleting the competition!', error);
            });
    };

    return (
        <div className="container">
            <h2>Lista de Competiciones</h2>
            <Button variant="primary" className="mb-3" onClick={() => onShowForm(null)}>Crear Competición</Button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {competitions.map(competition => (
                        <tr key={competition.competitionId}>
                            <td>
                                <Button variant="link" onClick={() => onShowDetail(competition.competitionId)}>
                                    {competition.name}
                                </Button>
                            </td>
                            <td>{competition.date}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => onShowForm(competition.competitionId)}>Editar</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(competition.competitionId)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompetitionList;
