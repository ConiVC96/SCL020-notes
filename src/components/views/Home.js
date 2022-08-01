import NavLinks from "../utils/Navbar";
import './Home.css';
import notes from "../images/notes.jpg";
import woman from "../images/woman.jpg";

export const Home = () => {


  return (
    <>
      <NavLinks />
      <section>
        <div className="content">
          <img src={notes} alt='first'/>
            <h3>Crea tus Notas</h3>
            <p > AppNotes es la aplicación web que estabas buscando, puedes plasmar tus ideas, escribir tu lista de compras, escribir tus apuntes, ¡y mucho más!.</p>
        </div>
        <div>
          <img src={woman} className= 'woman'alt='secondW'/>
        </div>
      </section>
    </>
  )
}
