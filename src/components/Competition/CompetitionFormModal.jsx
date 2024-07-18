import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const CompetitionFormModal = ({ showModal, handleClose, id, refreshData }) => {
  const [competition, setCompetition] = useState({
    name: "",
    date: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`https://localhost:7071/api/Competition/${id}`)
        .then((response) => {
          const data = response.data;
          // Convert the date to the correct format for the input[type="date"]
          data.date = new Date(data.date).toISOString().split("T")[0];
          setCompetition(data);
        })
        .catch((error) =>
          console.error("Error fetching competition details:", error)
        );
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompetition({ ...competition, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id ? axios.put : axios.post;
    const url = id
      ? `https://localhost:7071/api/Competition/${id}`
      : "https://localhost:7071/api/Competition";

    request(url, competition)
      .then(() => {
        handleClose();
        refreshData();
      })
      .catch((error) => {
        console.error(
          `There was an error ${id ? "updating" : "creating"} the competition!`,
          error
        );
      });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {id ? "Editar Competición" : "Crear Competición"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <Form.Group controlId="formCompetitionName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={competition.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCompetitionDate">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={competition.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          
          <Button variant="primary" type="submit" className="mt-3">
            {id ? "Actualizar" : "Crear"}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompetitionFormModal;
