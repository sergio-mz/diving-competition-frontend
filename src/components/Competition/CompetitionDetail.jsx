import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompetitionDetail = () => {
    const { id } = useParams();
    const [competition, setCompetition] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7071/api/Competition/${id}`)
            .then(response => setCompetition(response.data))
            .catch(error => console.error('Error fetching competition details:', error));
    }, [id]);

    if (!competition) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
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
        </div>
    );
};

export default CompetitionDetail;

