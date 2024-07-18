import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompetitionList from './components/Competition/CompetitionList';
import CompetitionFormModal from './components/Competition/CompetitionFormModal.jsx';
import CompetitionDetailModal from './components/Competition/CompetitionDetailModal';
import JudgeList from './components/Judge/JudgeList';
import JudgeFormModal from './components/Judge/JudgeFormModal.jsx';
import JudgeDetailModal from './components/Judge/JudgeDetailModal';
import Sidebar from './components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [type, setType] = useState(null);
    const [data, setData] = useState({ competitions: [], judges: [] });

    const handleShowFormModal = (id = null, type) => {
        setCurrentId(id);
        setType(type);
        setShowFormModal(true);
    };

    const handleShowDetailModal = (id, type) => {
        setCurrentId(id);
        setType(type);
        setShowDetailModal(true);
    };

    const handleCloseModal = () => {
        setShowFormModal(false);
        setShowDetailModal(false);
    };

    const refreshData = (endpoint, key) => {
        axios.get(`https://localhost:7071/api/${endpoint}`)
            .then(response => setData(prevState => ({ ...prevState, [key]: response.data })))
            .catch(error => console.error(`Error fetching ${key}:`, error));
    };

    return (
        <Router>
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-3">
                    <Routes>
                    <Route path="/" element={<CompetitionList data={data.competitions} onShowForm={handleShowFormModal} onShowDetail={handleShowDetailModal} refreshData={() => refreshData('Competition', 'competitions')} />} />
                    <Route path="/judges" element={<JudgeList data={data.judges} onShowForm={handleShowFormModal} onShowDetail={handleShowDetailModal} refreshData={() => refreshData('Judge', 'judges')} />} />
                        {/* Añade las rutas para clavadistas, clavados */}
                        {/* <Route path="/divers" element={<DiversList />} /> */}
                        {/* <Route path="/dives" element={<DivesList />} /> */}
                    </Routes>

                    {showFormModal && type === 'competition' && (
                    <CompetitionFormModal
                        showModal={showFormModal}
                        handleClose={handleCloseModal}
                        id={currentId}
                        refreshData={() => refreshData('Competition', 'competitions')}
                    />
                )}

                {showFormModal && type === 'judge' && (
                    <JudgeFormModal
                        showModal={showFormModal}
                        handleClose={handleCloseModal}
                        id={currentId}
                        refreshData={() => refreshData('Judge', 'judges')}
                    />
                )}

                {showDetailModal && type === 'competition' && (
                    <CompetitionDetailModal
                        showModal={showDetailModal}
                        handleClose={handleCloseModal}
                        id={currentId}
                    />
                )}

                {showDetailModal && type === 'judge' && (
                    <JudgeDetailModal
                        showModal={showDetailModal}
                        handleClose={handleCloseModal}
                        id={currentId}
                    />
                )}
                </div>
            </div>
        </Router>
    );
}

export default App;
