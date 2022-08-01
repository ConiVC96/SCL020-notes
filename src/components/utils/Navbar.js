import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './Navbar.css'

const NavLinks = () => {
  return (
    
      <Navbar className='navbar navbar-default navbar-fixed-bottom'>
          <Nav >
            <Nav.Link href="/login"><Button variant="outline-info" id='btnLogin' >Inicio de sesión</Button></Nav.Link>
            <Nav.Link href="/register"><Button variant="outline-info" id='btnRegister'>Registrarse</Button></Nav.Link>
          </Nav>
      </Navbar>
      
  )
}

export default NavLinks