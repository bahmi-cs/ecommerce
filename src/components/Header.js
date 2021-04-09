import React, { useContext } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase";
import { useAuthListener } from "../hooks";

const Header = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthListener();

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Shopping Central</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">
                {/* <i className="fas fa-home" />  */}
                Home
              </Nav.Link>
              {/* <Nav.Link href="/itemscreen">Item Details</Nav.Link> */}
              {user ? <Nav.Link href="/updates">Updates</Nav.Link> : ""}
              {user ? (
                <>
                  <Nav.Link href="/orders">
                    {/* <i className="fas fa-home" />  */}
                    Orders
                  </Nav.Link>
                  {/* <Nav.Link href="/addstore">Add Store</Nav.Link>
                  <Nav.Link href="/additem">Add Item</Nav.Link> */}
                </>
              ) : (
                ""
              )}
              <Nav.Link href="/bag">
                {/* <i className="fas fa-shopping-cart" />  */}
                Bag
              </Nav.Link>
              {user ? (
                <NavDropdown title="Account" id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={() => {
                      firebase.auth().signOut();
                      window.location.href = "/";
                    }}
                  >
                    Sign Out
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
