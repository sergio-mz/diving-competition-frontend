import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompetitionList from './components/Competition/CompetitionList';
import CompetitionDetail from './components/Competition/CompetitionDetail';
// Importa otros componentes según sea necesario

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<CompetitionList />} />
                    <Route path="/competition/:id" element={<CompetitionDetail />} />
                    {/* Define otras rutas aquí */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;