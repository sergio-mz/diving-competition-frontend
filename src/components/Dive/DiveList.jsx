import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { deleteData } from '../../helpers/api';

const DiveList = ({ data, onShowForm, onShowDetail, refreshData }) => {
    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const handleDelete = (id) => {
        deleteData('Dive', id, refreshData);
    };

    return (
        <div className="container">
            <h2>Lista de Clavados</h2>
            <Button variant="primary" className="mb-3" onClick={() => onShowForm(null, 'dive')}>Crear Clavado</Button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(dive => (
                        <tr key={dive.diveId}>
                            <td>
                                <Button variant='link' onClick={() => onShowDetail(dive.diveId, 'dive')}>
                                    {`${dive.diveCode} ${dive.group} - ${dive.height}m`}
                                </Button>
                            </td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => onShowForm(dive.diveId, 'dive')}>Editar</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(dive.diveId)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DiveList;
