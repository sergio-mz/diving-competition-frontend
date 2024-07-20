import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CompetitionList from "./components/Competition/CompetitionList";
import CompetitionFormModal from "./components/Competition/CompetitionFormModal.jsx";
import CompetitionDetailModal from "./components/Competition/CompetitionDetailModal";

import JudgeList from "./components/Judge/JudgeList";
import JudgeFormModal from "./components/Judge/JudgeFormModal.jsx";
import JudgeDetailModal from "./components/Judge/JudgeDetailModal";

import DiverList from "./components/Diver/DiverList.jsx";
import DiverFormModal from "./components/Diver/DiverFormModal.jsx";
import DiverDetailModal from "./components/Diver/DiverDetailModal.jsx";

import DiveList from "./components/Dive/DiveList.jsx";
import DiveFormModal from "./components/Dive/DiveFormModal.jsx";
import DiveDetailModal from "./components/Dive/DiveDetailModal.jsx";

import Sidebar from "./components/Sidebar";
import axios from "axios";

function App() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [type, setType] = useState(null);
  const [data, setData] = useState({
    competitions: [],
    judges: [],
    divers: [],
    dives: [],
  });

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
    axios
      .get(`https://localhost:7071/api/${endpoint}`)
      .then((response) =>
        setData((prevState) => ({ ...prevState, [key]: response.data }))
      )
      .catch((error) => console.error(`Error fetching ${key}:`, error));
  };

  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route
              path="/"
              element={
                <CompetitionList
                  data={data.competitions}
                  onShowForm={handleShowFormModal}
                  onShowDetail={handleShowDetailModal}
                  refreshData={() => refreshData("Competition", "competitions")}
                />
              }
            />
            <Route
              path="/judges"
              element={
                <JudgeList
                  data={data.judges}
                  onShowForm={handleShowFormModal}
                  onShowDetail={handleShowDetailModal}
                  refreshData={() => refreshData("Judge", "judges")}
                />
              }
            />
            <Route
              path="/divers"
              element={
                <DiverList
                  data={data.divers}
                  onShowForm={handleShowFormModal}
                  onShowDetail={handleShowDetailModal}
                  refreshData={() => refreshData("Diver", "divers")}
                />
              }
            />
            <Route
              path="/dives"
              element={
                <DiveList
                  data={data.dives}
                  onShowForm={handleShowFormModal}
                  onShowDetail={handleShowDetailModal}
                  refreshData={() => refreshData("Dive", "dives")}
                />
              }
            />
            {/* Añade las rutas para clavadistas, clavados */}
          </Routes>

          {showFormModal && type === "competition" && (
            <CompetitionFormModal
              showModal={showFormModal}
              handleClose={handleCloseModal}
              id={currentId}
              refreshData={() => refreshData("Competition", "competitions")}
            />
          )}

          {showFormModal && type === "judge" && (
            <JudgeFormModal
              showModal={showFormModal}
              handleClose={handleCloseModal}
              id={currentId}
              refreshData={() => refreshData("Judge", "judges")}
            />
          )}

          {showFormModal && type === "diver" && (
            <DiverFormModal
              showModal={showFormModal}
              handleClose={handleCloseModal}
              id={currentId}
              refreshData={() => refreshData("Diver", "divers")}
            />
          )}

          {showFormModal && type === "dive" && (
            <DiveFormModal
              showModal={showFormModal}
              handleClose={handleCloseModal}
              id={currentId}
              refreshData={() => refreshData("Dive", "dives")}
            />
          )}

          {showDetailModal && type === "competition" && (
            <CompetitionDetailModal
              showModal={showDetailModal}
              handleClose={handleCloseModal}
              id={currentId}
            />
          )}

          {showDetailModal && type === "judge" && (
            <JudgeDetailModal
              showModal={showDetailModal}
              handleClose={handleCloseModal}
              id={currentId}
            />
          )}

          {showDetailModal && type === "diver" && (
            <DiverDetailModal
              showModal={showDetailModal}
              handleClose={handleCloseModal}
              id={currentId}
            />
          )}

          {showDetailModal && type === "dive" && (
            <DiveDetailModal
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
