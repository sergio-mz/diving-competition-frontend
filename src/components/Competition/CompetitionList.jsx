// components/Competition/CompetitionList.js
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { fetchData, deleteData } from '../../helpers/api';

const CompetitionList = ({ data, onShowForm, onShowDetail, refreshData }) => {
    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const handleDelete = (id) => {
        deleteData('Competition', id, refreshData);
    };

    return (
        <div className="container">
            <h2>Lista de Competiciones</h2>
            <Button variant="primary" className="mb-3" onClick={() => onShowForm(null, 'competition')}>Crear Competición</Button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(competition => (
                        <tr key={competition.competitionId}>
                            <td>
                                <Button variant="link" onClick={() => onShowDetail(competition.competitionId, 'competition')}>
                                    {competition.name}
                                </Button>
                            </td>
                            <td>{competition.date}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => onShowForm(competition.competitionId, 'competition')}>Editar</Button>
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
