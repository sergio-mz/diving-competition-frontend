import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { deleteData } from '../../helpers/api';

const DiverList = ({ data, onShowForm, onShowDetail, refreshData }) => {
    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const handleDelete = (id) => {
        deleteData('Diver', id, refreshData);
    };

    return (
        <div className="container">
            <h2>Lista de Clavadistas</h2>
            <Button variant="primary" className="mb-3" onClick={() => onShowForm(null, 'diver')}>Crear Clavadista</Button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(diver => (
                        <tr key={diver.diverId}>
                            <td>
                                <Button variant='link' onClick={() => onShowDetail(diver.diverId, 'diver')}>
                                    {diver.name}
                                </Button>
                            </td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => onShowForm(diver.diverId, 'diver')}>Editar</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(diver.diverId)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DiverList;
