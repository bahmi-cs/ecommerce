import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { FirebaseContext } from "../context/firebase";
import { Message, FormContainer } from "../components";
import * as ROUTES from "../constants/routes";

const RegisterScreen = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [shippingInstruction, setShippingInstruction] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);

  const isInvalid =
    fullName === "" ||
    mobileNumber === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === "";

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user.updateProfile({
            displayName: fullName,
          });
        })
        .then(() => {
          history.push(ROUTES.BROWSE);
        })
        .catch((error) => {
          setPassword("");
          setConfirmPassword("");
          setError(error.message);
        });
    }
  };

  return (
    // <FormContainer>
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h3 className="mb-3">Create New Account</h3>

          <Form.Row>
            <Col xs={12} md={6}>
              {message && <Message>{message}</Message>}
              {error && <Message>{error}</Message>}
            </Col>
          </Form.Row>
          <Form onSubmit={submitHandler}>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="fullName"
                    placeholder="Enter Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} md={3}>
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="mobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="mobileNumber"
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId="province">
                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId="postalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="postalCode"
                    placeholder="Enter Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="shippingInstruction">
                  <Form.Label>Shipping Instruction</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="E.g: Buzzer Code - leave it at the door"
                    value={shippingInstruction}
                    onChange={(e) => setShippingInstruction(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Button
              disabled={isInvalid}
              type="submit"
              className="float-right"
              variant="primary"
            >
              Create
            </Button>
            {/* <Col xs={12} md={6}>
              <Row className="py-2 mt-4 float-right">
                <Col>
                  Already have an account?
                  <Link to="/login"> Sign In</Link>
                </Col>
              </Row>
            </Col> */}
          </Form>
        </Col>
      </Row>
    </Container>
    // </FormContainer>
  );
};

export default RegisterScreen;
