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
export default Register;