import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompetitionList from './components/Competition/CompetitionList.jsx';
import CompetitionFormModal from './components/Competition/CompetitionFormModal.jsx';
import CompetitionDetailModal from './components/Competition/CompetitionDetailModal.jsx';
import JudgesList from './components/Judge/JudgesList.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentCompetitionId, setCurrentCompetitionId] = useState(null);
    const [competitions, setCompetitions] = useState([]);

    const handleShowFormModal = (competitionId = null) => {
        setCurrentCompetitionId(competitionId);
        setShowFormModal(true);
    };

    const handleShowDetailModal = (competitionId) => {
        setCurrentCompetitionId(competitionId);
        setShowDetailModal(true);
    };

    const handleCloseModal = () => {
        setShowFormModal(false);
        setShowDetailModal(false);
    };

    const refreshCompetitions = () => {
        axios.get('https://localhost:7071/api/Competition')
            .then(response => setCompetitions(response.data))
            .catch(error => console.error('Error fetching competitions:', error));
    };

    return (
        <Router>
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-3">
                    <Routes>
                        <Route path="/" element={<CompetitionList competitions={competitions} onShowForm={handleShowFormModal} onShowDetail={handleShowDetailModal} refreshCompetitions={refreshCompetitions} />} />
                        <Route path="/judges" element={<JudgesList />} />
                        {/* Añade las rutas para clavadistas, clavados */}
                        {/* <Route path="/divers" element={<DiversList />} /> */}
                        {/* <Route path="/dives" element={<DivesList />} /> */}
                    </Routes>

                    {showFormModal && (
                        <CompetitionFormModal
                            showModal={showFormModal}
                            handleClose={handleCloseModal}
                            competitionId={currentCompetitionId}
                            refreshCompetitions={refreshCompetitions}
                        />
                    )}

                    {showDetailModal && (
                        <CompetitionDetailModal
                            showModal={showDetailModal}
                            handleClose={handleCloseModal}
                            competitionId={currentCompetitionId}
                        />
                    )}
                </div>
            </div>
        </Router>
    );
}

export default App;
