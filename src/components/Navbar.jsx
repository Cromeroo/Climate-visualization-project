import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function MyNavbar() {
  return (
    <div>
    <h1><Link to="/">Territorio comida y vida</Link></h1>

    <Navbar bg="transparent" expand="lg" style={{fontSize: '20px'}} >
      <Container style={{justifyContent: 'center'}}>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

        <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="me-auto" style={{gap: '20px'}}> 
          <Nav.Link href="/proyecto">Proyecto</Nav.Link>
            <Nav.Link href="/territorios">Territorios</Nav.Link>
            <Nav.Link href="#pets">Espacios de cocreación</Nav.Link>
            <Nav.Link href="#adoptins">Variedad climatica</Nav.Link>
            <Nav.Link href="#adoptions">Indicadores climaticos</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
    </div>
  );
}
export default MyNavbar;