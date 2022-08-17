import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "./Show.css";
import NavBtnBack from "../utils/NavBtnBack";
import { useAuth } from "../../context/authContext";
import Button from "react-bootstrap/esm/Button";
import Jokes from "../api/Jokes";

const MySwal = withReactContent(Swal);

export const Show = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const [notes, setNotes] = useState([]);

  const notesCollection = collection(db, "notes");

  const getNotes = async () => {
    const data = await getDocs(notesCollection);

    setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
    getNotes();
  };

  const confirmDelete = (id) => {
    MySwal.fire({
      title: "¿Elimina el producto?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //llamamos a la funcion para eliminar
        deleteNote(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className="containerBtnLog">
        <NavBtnBack path="/create" />
        <Button id="btnLogOut" onClick={handleLogOut}>
          Cerrar Sesión
        </Button>
      </div>

      <CardGroup>
        {notes.map((note) => (
          <div key={note.id}>
            <Card>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
                <Link to={`/edit/${note.id}`} className="btn btn-light">
                  <i className="fa-solid fa-pencil"></i>
                </Link>
                <button
                  onClick={() => {
                    confirmDelete(note.id);
                  }}
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </CardGroup>
      <div>
        <Jokes />
      </div>
    </>
  );
};
