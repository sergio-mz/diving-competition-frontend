import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompetitionList = () => {
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7071/api/Competition')
            .then(response => setCompetitions(response.data))
            .catch(error => console.error('Error fetching competitions:', error));
    }, []);

    return (
        <div className="container">
            <h2 className="my-4">List of Competitions</h2>
            <ul className="list-group">
                {competitions.map(competition => (
                    <li key={competition.competitionId} className="list-group-item">
                        <Link to={`/competition/${competition.competitionId}`}>{competition.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompetitionList;


