import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { Message, FormContainer } from "../components";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
// import LoginCSS from "../styles/Login.module.css";

const LoginScreen = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const submitHandler = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setEmail("");
        setPassword("");
        setError(error.message);
      });
  };

  console.log(process.env.PUBLIC_URL);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Row className="pb-1">
          <Col>
            <Link to={ROUTES.SIGN_UP}> Forgot password?</Link>
          </Col>
        </Row>
        <Button disabled={isInvalid} type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New User?
          <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
