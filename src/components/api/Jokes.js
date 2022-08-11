import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

function Jokes() {
  function loadJoke() {
    fetch("https://api.chucknorris.io/jokes/random") // llamada a la API, el resultado es una Promise
      .then((response) => response.json()) //cuando la petición finalice, transformamos la respuesta a JSON (response.json() también es una Promise)
      .then((data) => setJoke(data.value)); //aquí ya tenemos la respuesta en formato objeto
  }

  const [joke, setJoke] = useState([]);

  useEffect(() => {
    loadJoke();
  }, []);

  return (
    <div className="containerChuck">
      <div id="chuckText">
        <h5>{joke}</h5>
      </div>
      <Button id="btnChuck" onClick={loadJoke}>
        {" "}
        Más chistes de Chuck Norris
      </Button>
    </div>
  );
}
export default Jokes;
