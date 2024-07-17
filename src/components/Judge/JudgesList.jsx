import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const JudgesList = () => {
    const [judges, setJudges] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7071/api/Judge')
            .then(response => setJudges(response.data))
            .catch(error => console.error('Error fetching judges:', error));
    }, []);

    return (
        <div className="container">
            <h2>Lista de Jueces</h2>
            <ul className="list-group">
                {judges.map(judge => (
                    <li key={judge.judgeId} className="list-group-item">{judge.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default JudgesList;
