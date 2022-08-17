import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import NavBtnBack from "../utils/NavBtnBack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import "./Create.css";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const notesCollection = collection(db, "notes");

  const store = async (e) => {
    e.preventDefault();

    await addDoc(notesCollection, {
      title: title,
      description: description,
    });
    navigate("/show");
  };

  return (
    <>
      <NavBtnBack id="btnNav1" path="/show" />
      <h1 id="titlesCreate">¡Crea tu nota!</h1>
      <section>
        <Form onSubmit={store}>
          <div className="mb-3">
            <h4 id="titlesCreate">Título</h4>
            <Form.Control
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </div>

          <div className="mb-3">
            <h4>Descripción de la nota</h4>
            <Form.Control
              id="descriptionBlock"
              required
              value={description}
              as="textarea"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </div>
          <Button variant="info" id="btnRegister" type="submit">
            Guardar nota
          </Button>
        </Form>
      </section>
    </>
  );
};
