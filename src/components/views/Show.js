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

const MySwal = withReactContent(Swal);

export const Show = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  //1 - configuramos los hooks
  const [notes, setNotes] = useState([]);

  //2 - referenciamos a la DB firestore
  const notesCollection = collection(db, "notes");

  //3 - Funcion para mostrar TODOS los docs
  const getNotes = async () => {
    const data = await getDocs(notesCollection);
    //console.log(data.docs)
    setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //console.log(notes)
  };
  //4 - Funcion para eliminar un doc
  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
    getNotes();
  };
  //5 - Funcion de confirmacion para Sweet Alert 2
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
  //6 - usamos useEffect
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  //7 - devolvemos vista de nuestro componente

  return (
    <>
    <div className="containerBtnLog">
    <NavBtnBack path="/create" />
   <Button id="btnLogOut" onClick={handleLogOut} >Cerrar Sesión</Button>
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
    </>
  );
};
