import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { FirebaseContext } from "../context/firebase";
import { Message } from "../components";
import * as ROUTES from "../constants/routes";
import { useAuthListener } from "../hooks";

const AddStoreScreen = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthListener();

  const db = firebase.firestore();

  const [storeName, setStoreName] = useState("");
  const [ownerFullName, setOwnerFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeCountry, setStoreCountry] = useState("");
  const [storeProvince, setStoreProvince] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [storePostalCode, setStorePostalCode] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [shippingInstruction, setShippingInstruction] = useState("");
  const [storePicture, setStorePicture] = useState("");
  const [storeLogo, setStoreLogo] = useState("");
  const [storeIdPicture1, setStoreIdPicture1] = useState("");
  const [storeIdPicture2, setStoreIdPicture2] = useState("");
  const [storeSchedule, setStoreSchedule] = useState("");
  const [fees, setFees] = useState("");
  const [status, setStatus] = useState("");
  const [block, setBlock] = useState("");
  const [activity, setActivity] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);

  const isInvalid =
    storeName === "" ||
    ownerFullName === "" ||
    mobileNumber === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === "" ||
    storeProvince === "" ||
    storeCity === "" ||
    storePostalCode === "" ||
    storeAddress === "" ||
    storeCountry === "" ||
    status === "";

  async function addToStoresCollection() {
    await db.collection("stores").add({
      user: user.uid,
      storeName: storeName,
      ownerFullName: ownerFullName,
      mobileNumber: mobileNumber,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      storeCountry: storeCountry,
      storeProvince: storeProvince,
      storeCity: storeCity,
      storePostalCode: storePostalCode,
      storeAddress: storeAddress,
      shippingInstruction: shippingInstruction,
      storePicture: storePicture,
      storeLogo: storeLogo,
      storeIdPicture1: storeIdPicture1,
      storeIdPicture2: storeIdPicture2,
      storeSchedule: storeSchedule,
      fees: fees,
      status: status,
      block: block,
      activity: activity,
      uploadedFiles: uploadedFiles,
    });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      addToStoresCollection();
      setMessage("Store added successfully!");
      setStoreName("");
      setOwnerFullName("");
      setMobileNumber("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setStoreCountry("");
      setStoreProvince("");
      setStoreCity("");
      setStorePostalCode("");
      setStoreAddress("");
      setShippingInstruction("");
      setStorePicture("");
      setStoreLogo("");
      setStoreIdPicture1("");
      setStoreIdPicture2("");
      setStoreSchedule("");
      setFees("");
      setStatus("");
      setBlock("");
      setActivity("");
      setUploadedFiles("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h3 className="mb-3">Add New Store</h3>

          <Form.Row>
            <Col xs={12} md={6}>
              {message && <Message variant="success">{message}</Message>}
              {error && <Message>{error}</Message>}
            </Col>
          </Form.Row>
          <Form onSubmit={submitHandler}>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="storeName">
                  <Form.Label>Store Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store Name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="ownerFullName">
                  <Form.Label>Owner Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Owner Full Name"
                    value={ownerFullName}
                    onChange={(e) => setOwnerFullName(e.target.value)}
                  ></Form.Control>
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
              <Col xs={12} md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="storeCountry">
                  <Form.Label>Store Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store Country"
                    value={storeCountry}
                    onChange={(e) => setStoreCountry(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="storeProvince">
                  <Form.Label>Store Province</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store Province"
                    value={storeProvince}
                    onChange={(e) => setStoreProvince(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="storeCity">
                  <Form.Label>Store City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store City"
                    value={storeCity}
                    onChange={(e) => setStoreCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="storePostalCode">
                  <Form.Label>Store Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Store Postal Code"
                    value={storePostalCode}
                    onChange={(e) => setStorePostalCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="storeAddress">
                  <Form.Label>Store Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store Address"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="shippingInstruction">
                  <Form.Label>Shipping Instruction</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Shipping Instruction"
                    value={shippingInstruction}
                    onChange={(e) => setShippingInstruction(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="storePicture">
                  <Form.Label>Store Picture</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store Picture"
                    value={storePicture}
                    onChange={(e) => setStorePicture(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="storeLogo">
                  <Form.Label>Store Logo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Store Logo"
                    value={storeLogo}
                    onChange={(e) => setStoreLogo(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="storeIdPicture1">
                  <Form.Label>Store ID Picture 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store ID Picture 1"
                    value={storeIdPicture1}
                    onChange={(e) => setStoreIdPicture1(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="storeIdPicture2">
                  <Form.Label>Store ID Picture 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Store ID Picture 2"
                    value={storeIdPicture2}
                    onChange={(e) => setStoreIdPicture2(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="storeSchedule">
                  <Form.Label>Store Availability Schedule</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store Availability Schedule"
                    value={storeSchedule}
                    onChange={(e) => setStoreSchedule(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="fees">
                  <Form.Label>Fees</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Fees"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="block">
                  <Form.Label>Block</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Block"
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="activity">
                  <Form.Label>Activity</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Activity"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="uploadedFiles">
                  <Form.Label>Uploaded Files</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Uploaded Files"
                    value={uploadedFiles}
                    onChange={(e) => setUploadedFiles(e.target.value)}
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
              Add Store
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStoreScreen;
