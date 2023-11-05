import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from "react";
import Axios from 'axios'

function BasicNav() {
  const [firstName, setFirstName] = useState("");
  const user = sessionStorage.getItem("username")

  useEffect(() => {
    Axios.get("http://localhost:5001/api/singleUser/" + user, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
    .then((response) => {
      setFirstName(response.data.firstName);
      sessionStorage.setItem("firstName", response.data.firstName);
      sessionStorage.setItem("permissions", response.data.permissions);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem("token")
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('User')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('permissions')
    window.location = "/";
  }

  return (
    <Navbar className="bg-body-warning">
      <Container>
        <Navbar.Brand href="/">Whirlpool</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/landing">Home</Nav.Link>
            <Nav.Link href="/question">Questions</Nav.Link>
            {user && <Nav.Link href="/profile">My Profile</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href='/profile' style={{marginRight:"5%"}}>{firstName}</Nav.Link>
          <Button variant={user ? 'danger' : 'primary'} onClick={handleLogout}>{user ? 'Log out' : 'Log in'}</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicNav;