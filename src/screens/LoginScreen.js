import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { Message, FormContainer } from "../components";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import loginbg from "../assets/img/login-bg.jpg";
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
    // <div className="d-lg-flex">
    //   <div
    //     className="bg order-1 order-md-2"
    //     style={{
    //       //   backgroundImage: `url(${require("../assets/img/login-bg.jpg")})`,
    //       backgroundImage: 'url("/dist/img/login-bg.jpg")',
    //     }}
    //   ></div>
    //   <div className="contents order-2 order-md-1">
    //     <div className="container">
    //       <div className="row align-items-center justify-content-center">
    //         <div className="col-md-7">
    //           <h3>
    //             Login to <strong>Shopping Central</strong>
    //           </h3>

    //           <form action="#" method="post">
    //             <div className="form-group first">
    //               <label htmlFor="username">Username</label>
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 placeholder="your-email@gmail.com"
    //                 id="username"
    //               />
    //             </div>
    //             <div className="form-group last mb-3">
    //               <label htmlFor="password">Password</label>
    //               <input
    //                 type="password"
    //                 className="form-control"
    //                 placeholder="Your Password"
    //                 id="password"
    //               />
    //             </div>
    //             <div className="d-flex mb-5 align-items-center">
    //               {/* <label className="control control--checkbox mb-0">
    //                 <span className="caption">Remember me</span>
    //                 <input type="checkbox" defaultChecked="checked" />
    //                 <div className="control__indicator" />
    //               </label> */}
    //               <span className="">
    //                 <a href="#" className="forgot-pass">
    //                   Forgot Password?
    //                 </a>
    //               </span>
    //             </div>
    //             <input
    //               type="submit"
    //               defaultValue="Log In"
    //               className="btn btn-block btn-primary"
    //             />
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

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
