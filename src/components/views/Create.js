import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

export const Create = () => {
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
  const navigate = useNavigate()
  
  //referencia a nuestra base de datos
  const notesCollection = collection(db, "notes")
  

  const store = async (e) => {
    e.preventDefault()
    //le pasamos la colección y los datos que pasamos del formulario
    await addDoc( notesCollection, { title: title, description: description } ) 
    navigate('/show')
    //console.log(e.target[0].value)
  }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Create Note</h1>
                 <form onSubmit={store}>
                 <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input
                            value={title}
                            onChange={ (e) => setTitle(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <input
                            value={description}
                            onChange={ (e) => setDescription(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Save</button>
                 </form>   
            </div>
        </div>
    </div> 
  )
}

