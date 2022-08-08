import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import NavBtnBack from "../utils/NavBtnBack";
import { Link } from "react-router-dom";

export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(user.email, user.password);
      navigate("/show");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <NavBtnBack path="/" />

      {error && <p>{error}</p>}

      <Form className="form" onSubmit={handleSubmit}>
        <div className="section">
          <h2>Crea tu cuenta</h2>
          <div className="containerInput">
            <label className="labRegister" htmlFor="email">
              Registre su Correo
            </label>

            <Form.Control
              className="formInputs"
              type="email"
              name="email"
              placeholder="youremail@mail.com"
              onChange={handleChange}
            />

            <label className="labRegister" htmlFor="password">
              Crea tu contraseña
            </label>
            <Form.Control
              className="formInputs"
              type="password"
              name="password"
              placeholder="******"
              onChange={handleChange}
            />
          </div>
          <Button variant="outline-info" id="btnLogin" type="submit">
            Crear cuenta
          </Button>

          <label htmlFor="email">¿Ya tienes una cuenta?</label>
          <Link to="/login">
            <Button variant="outline-info" id="btnLogin" type="submit">
              Ingresa sesión
            </Button>
          </Link>
        </div>
      </Form>
    </>
  );
}
export default Register;
