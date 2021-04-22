import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { FirebaseContext } from "../context/firebase";
import { Message } from "../components";
import * as ROUTES from "../constants/routes";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const RegisterScreen = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const db = firebase.firestore();

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
  const [addresses, setAddresses] = useState([]);
  const [shippingInstructions, setShippingInstructions] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);

  const isInvalid =
    fullName === "" ||
    mobileNumber === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === "" ||
    country === "" ||
    province === "" ||
    city === "" ||
    postalCode === "" ||
    address === "" ||
    shippingInstructions === "";

  async function addToUsersCollection(result) {
    addresses.push({
      address,
      city,
      country,
      postalCode,
      province,
    });

    const res = await db
      .collection("customers")
      .doc(result.user.uid.substring(0, 20))
      // .doc(btoa(Math.random()).slice(0, 20))
      .set({
        fullName,
        mobileNumber,
        email,
        addresses,
        shippingInstructions,
      });
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result.user);
          result.user.sendEmailVerification();
          result.user.updateProfile({
            displayName: fullName,
            phoneNumber: mobileNumber,
          });
          addToUsersCollection(result);
        })
        .then(() => {
          history.push(ROUTES.HOME);
        })
        .catch((error) => {
          setPassword("");
          setConfirmPassword("");
          setError(error.message);
        });
    }
  };

  return (
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
                    type="text"
                    placeholder="Enter Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} md={3}>
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <CountryDropdown
                    value={country}
                    class="form-control"
                    onChange={(val) => setCountry(val)}
                    priorityOptions={["CA", "US", "GB"]}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="mobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId="province">
                  <Form.Label>Province</Form.Label>
                  <RegionDropdown
                    country={country}
                    class="form-control"
                    value={province}
                    onChange={(val) => setProvince(val)}
                  />
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
                    type="text"
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
                <Form.Group controlId="shippingInstructions">
                  <Form.Label>Shipping Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="E.g: Buzzer Code - leave it at the door"
                    value={shippingInstructions}
                    onChange={(e) => setShippingInstructions(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Button
              disabled={isInvalid}
              type="submit"
              className="float-right"
              variant="primary rounded-pill"
            >
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
