import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import { useAuthListener } from '../hooks';

const Header = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthListener();

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Shopping Central
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {user ? (
                <Nav.Link as={Link} to="/updates">
                  Updates
                </Nav.Link>
              ) : (
                ''
              )}
              {user ? (
                <>
                  <Nav.Link as={Link} to="/orders">
                    Orders
                  </Nav.Link>
                </>
              ) : (
                ''
              )}
              {user ? (
                <Nav.Link as={Link} to="/bag">
                  Bag
                </Nav.Link>
              ) : undefined}
              {user ? (
                <NavDropdown title="Account" id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={() => {
                      firebase.auth().signOut();
                      window.location.href = '/';
                    }}
                  >
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/signin">Sign In</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
