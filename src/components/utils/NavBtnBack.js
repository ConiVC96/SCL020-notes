import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

const NavBtnBack = (props) => {
  return (
    <>
      <Nav.Link href={props.path}>
        {props.path === "/" ? (
          <Button variant="info" id="createAccount">
            Volver
          </Button>
        ) : props.path === "/create" ? (
          <Button variant="info" id="createAccount">
            Crear nueva nota
          </Button>
        ) : (
          <Button variant="info" id="createAccount">
            Mis notas
          </Button>
        )}
      </Nav.Link>
    </>
  );
};

export default NavBtnBack;
