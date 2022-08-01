import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebaseConfig";

export const Edit = () => {
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
   

    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        //traemos todos los datos
        const note = doc(db, "notes", id)
        //acá tenemos todo lo que vamos a capturar
        const data = {title: title, description: description}
        //usamos la función updateDoc de firestre con la nota y datos que actualizaremos
        await updateDoc(note, data)
        navigate('/show')
    }

    const getNoteById = async (id) => {
        const note = await getDoc( doc(db, "notes", id) )
        if(note.exists()) {
            //console.log(note.data())
            setTitle(note.data().title)
            setDescription(note.data().description)    
            
        }else{
            console.log('La nota no existe')
        }
    }

    useEffect( () => {
        getNoteById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Edit Note</h1>
                 <form onSubmit={update}>
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
 
                    <button type='submit' className='btn btn-primary'>Update</button>
                 </form>   
            </div>
        </div>
    </div> 
    )
}

