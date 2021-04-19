import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { Message, FormContainer } from "../components";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";

const ForgotPasswordScreen = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isInvalid = email === "";

  const submitHandler = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setError("");
        setMessage("An email has been sent to reset the password!");
      })
      .catch((error) => {
        setEmail("");
        setMessage("");
        setError(error.message);
      });
  };

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {message && <Message variant="success">{message}</Message>}
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

        <Button disabled={isInvalid} type="submit" variant="primary">
          Submit
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

export default ForgotPasswordScreen;
