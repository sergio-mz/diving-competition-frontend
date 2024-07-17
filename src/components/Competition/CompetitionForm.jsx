// components/Competition/CompetitionForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompetitionForm = ({ competitionId, handleClose, refreshCompetitions }) => {
    const [competition, setCompetition] = useState({
        name: '',
        date: '',
    });

    useEffect(() => {
        if (competitionId) {
            axios.get(`https://localhost:7071/api/Competition/${competitionId}`)
                .then(response => {
                    const data = response.data;
                    // Convert the date to the correct format for the input[type="date"]
                    data.date = new Date(data.date).toISOString().split('T')[0];
                    setCompetition(data);
                })
                .catch(error => console.error('There was an error fetching the competition!', error));
        }
    }, [competitionId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompetition({ ...competition, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (competitionId) {
            axios.put(`https://localhost:7071/api/Competition/${competitionId}`, competition)
                .then(response => {
                    refreshCompetitions();
                    handleClose();
                })
                .catch(error => {
                    console.error('There was an error updating the competition!', error);
                });
        } else {
            axios.post('https://localhost:7071/api/Competition/create', competition)
                .then(response => {
                    refreshCompetitions();
                    handleClose();
                })
                .catch(error => {
                    console.error('There was an error creating the competition!', error);
                });
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="name" value={competition.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input type="date" className="form-control" name="date" value={competition.date} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{competitionId ? 'Actualizar' : 'Crear'}</button>
            </form>
        </div>
    );
};

export default CompetitionForm;
