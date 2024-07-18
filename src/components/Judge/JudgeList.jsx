import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { fetchData, deleteData } from '../../helpers/api';

const JudgeList = ({ data, onShowForm, onShowDetail, refreshData }) => {
    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const handleDelete = (id) => {
        deleteData('Judge', id, refreshData);
    };

    return (
        <div className="container">
            <h2>Lista de Jueces</h2>
            <Button variant="primary" className="mb-3" onClick={() => onShowForm(null, 'judge')}>Crear Juez</Button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(judge => (
                        <tr key={judge.judgeId}>
                            <td>
                                <Button variant='link' onClick={() => onShowDetail(judge.judgeId, 'judge')}>
                                    {judge.name}
                                </Button>
                            </td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => onShowForm(judge.judgeId, 'judge')}>Editar</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(judge.judgeId)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JudgeList;
