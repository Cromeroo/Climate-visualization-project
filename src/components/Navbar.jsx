import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function MyNavbar() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="my-title"><Link to="/">Territorio, comida y vida</Link></h1>

    <Navbar className='navbar' expand="lg"  >
      <Container className='navbar-content'>
      <Navbar.Toggle className="custom-toggler" aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="me-auto"  style={{gap: '50px'}}> 
          <Nav.Link href="/proyecto">Proyecto</Nav.Link>
            <Nav.Link href="/territorios" >Territorios</Nav.Link>
            <Nav.Link href="/espacios">Espacios de cocreación</Nav.Link>
            <Nav.Link href="#adoptins">Variabilidad climática</Nav.Link>
            <Nav.Link href="#adoptions">Indicadores climáticos</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
    </div>
  );
}
export default MyNavbar;