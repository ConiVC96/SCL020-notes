import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Register.css'

export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value });

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
    <div>
    {error && <p>{error}</p>}
    <div className="registerForm">
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="youremail@mail.com"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="******"
          onChange={handleChange}
        />

        <Button variant="outline-info" type="submit" id='btnRegister'>Registrarse</Button>
      </Form>
    </div>
    </div>
  );
}

const RegisterForm = (props) => {
  return (
    <div className="allForm">
      <Form className='form' onSubmit={props.handleSubmit}>
        <div className="containerText">
          <div className="text">Crea una cuenta</div>
        </div>
        <div className="groupInputs">
          <Form.Control type="text" className="format shadow1" placeholder="email@papitas.com" required name='email'
            onChange={props.handleChange} />
          <Form.Control type='password' className="format shadow1" name='password' required
            onChange={props.handleChange} placeholder='contraseña desde 6 dígitos' />
        </div>
        <Button variant="outline-info" type="submit" id='btnRegister'>
          Registrarse
        </Button>
      </Form>
      <div className="textError">
        {props.error && <p>{props.error}</p>}
      </div>
    </div>
  )
}

export default RegisterForm