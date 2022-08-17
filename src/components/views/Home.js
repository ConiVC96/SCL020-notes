import NavLinks from "../utils/Navbar";
import "./Home.css";
import woman from "../images/woman.jpg";

export const Home = () => {
  return (
    <>
      <NavLinks />
      <section>
        <div className="contentHome">
          <h2 className="stella">StellaNotes</h2>
          <p>
            StellaNotes es la aplicación web que estabas buscando, puedes
            plasmar tus ideas, escribir tu lista de compras, tus apuntes, ¡y
            mucho más!.
          </p>
          <img src={woman} className="woman" alt="secondW" />
        </div>
      </section>
    </>
  );
};
