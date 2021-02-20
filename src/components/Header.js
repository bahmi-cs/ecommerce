import React, { useContext } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthListener } from "../hooks";
import { FirebaseContext } from "../context/firebase";

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthListener();

  // const myuser = firebase.auth().currentUser || {};

  console.log("user", user);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Shopping Central</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">
                {/* <i className="fas fa-home" />  */}
                Home
              </Nav.Link>
              {user ? (
                <Nav.Link href="/">
                  {/* <i className="fas fa-home" />  */}
                  Updates
                </Nav.Link>
              ) : (
                ""
              )}
              {user ? (
                <Nav.Link href="/">
                  {/* <i className="fas fa-home" />  */}
                  Orders
                </Nav.Link>
              ) : (
                ""
              )}
              <Nav.Link href="/bag">
                {/* <i className="fas fa-shopping-cart" />  */}
                Bag
              </Nav.Link>
              {user ? (
                <NavDropdown title={user.displayName} id="username">
                  <Link to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={() => firebase.auth().signOut()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/signin">
                  {/* <i className="fas fa-user" />  */}
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
