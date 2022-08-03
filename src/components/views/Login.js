import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import NavBtnBack from "../utils/NavBtnBack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { Link } from "react-router-dom";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/show");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      await loginWithGoogle();
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
        <div className="containerInput">
          <label htmlFor="email">Ingrese su Correo</label>

          <Form.Control
            className="formInputs"
            type="email"
            name="email"
            placeholder="youremail@mail.com"
            onChange={handleChange}
          />

          <label htmlFor="password">Contraseña</label>
          <Form.Control
            className="formInputs"
            type="password"
            name="password"
            placeholder="******"
            onChange={handleChange}
          />
        </div>
        <Button variant="outline-info" id="btnLogin" type="submit">
          Iniciar Sesión
        </Button>
        <Button
          variant="outline-info"
          id="btnGoogle"
          type="submit"
          onClick={handleGoogleSignin}
        >
          <i class="fa-brands fa-google"></i>
          Iniciar sesión con Google
        </Button>
        <label htmlFor="email">¿Todavía no tiene cuenta?</label>
        <Link to="/register">
          <Button variant="outline-info" id="btnRegister" type="submit">
            Crea tu cuenta
          </Button>
        </Link>
      </Form>
    </>
  );
}
