import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebaseConfig";
import NavBtnBack from "../utils/NavBtnBack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

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
        <>
          <NavBtnBack id="btnNav1" path='/show'/>
          <h1 id="titlesCreate">¡Edita tu nota!</h1>
          <section>
              <Form onSubmit={update}>
                <div className="mb-3">
                  <h4 id="titlesCreate">Título</h4>
                  <Form.Control
                    required value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                   
                  />
                </div>
    
                <div className="mb-3">
                  <h4>Descripción de la nota</h4>
                  <Form.Control id="descriptionBlock"
                    required value={description} as="textarea"
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
