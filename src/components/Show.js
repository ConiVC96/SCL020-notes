import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Show = () => {
  //1 - configuramos los hooks
  const [notes, setNotes] = useState( [] )

  //2 - referenciamos a la DB firestore
  const notesCollection = collection(db, "notes")

  //3 - Funcion para mostrar TODOS los docs
  const getNotes = async ()   => {
   const data = await getDocs(notesCollection)
   //console.log(data.docs)
   setNotes(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   //console.log(notes)
  }
  //4 - Funcion para eliminar un doc
  const deleteNote = async (id) => {
   const noteDoc = doc(db, "notes", id)
   await deleteDoc(noteDoc)
   getNotes()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el producto?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteNote(id)               
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })    
  }
  //6 - usamos useEffect
  useEffect( () => {
    getNotes()
    // eslint-disable-next-line
  }, [] )
  //7 - devolvemos vista de nuestro componente
  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create Notes</Link>    
          </div>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { notes.map( (note) => (
                <tr key={note.id}>
                <td> {note.title} </td>
                <td> {note.description} </td>
                <td>
                    <Link to={`/edit/${note.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={ () => { confirmDelete(note.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default Show
  