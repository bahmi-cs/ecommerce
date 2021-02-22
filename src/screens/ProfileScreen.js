import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col, Container, Toast } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Message, Loader } from "../components";
import { FirebaseContext } from "../context/firebase";
import { Link, useHistory } from "react-router-dom";
import { useAuthListener } from "../hooks";

const ProfileScreen = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const db = firebase.firestore();
  const { user } = useAuthListener();

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);

  //   console.log("user", user);

  const getUser = async () => {
    const userRef = db.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      const { fullName, email, mobileNumber, address } = doc.data();
      setFullName(fullName);
      setMobileNumber(mobileNumber);
      setEmail(email);
      setAddress(address);
      console.log("Document data:", doc.data());
    }
  };

  const updateUser = async () => {
    await db
      .collection("users")
      .doc(user.uid)
      .update({
        fullName: fullName,
        mobileNumber: mobileNumber,
        email: email,
        address: address,
      })
      .then(() => {
        setMessage("User profile updated");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (!user) {
      history.push("/signin");
    } else {
      setLoading(true);
      getUser();
      setLoading(false);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    updateUser();
  };

  return (
    <Container>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "100px",
        }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={4000}
          autohide
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <Toast.Header className="success bg-success">
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto text-white">Success</strong>
            <small className="text-white">Just now</small>
          </Toast.Header>
          <Toast.Body>Account created successfully!</Toast.Body>
        </Toast>
      </div>
      <Button onClick={() => setShow(true)}>Show Toast</Button>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3 className="mb-3">User Profile</h3>
          {message && <Message variant="info">{message}</Message>}
          {error && <Message>{error}</Message>}
          {/* {errorProfile && <Message variant="danger">{errorProfile}</Message>} */}
          {/* {success && <Message variant="success">Profile Updated</Message>} */}
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="mobileNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group> */}
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
