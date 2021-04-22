import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col, Container, Toast } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Message, Loader } from "../components";
import { FirebaseContext } from "../context/firebase";
import { Link, useHistory } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useAuthListener } from "../hooks";

const ProfileScreen = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const db = firebase.firestore();
  const { user } = useAuthListener();

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [error, setError] = useState("");

  console.log("user", user);

  const getUser = async () => {
    setLoading(true);

    const userRef = db.collection("customers").doc(user.uid.substring(0, 20));
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      const { fullName, email, mobileNumber, addresses } = doc.data();
      setFullName(fullName);
      setMobileNumber(mobileNumber);
      setEmail(email);
      setAddresses(addresses);
      // console.log("Document data:", doc.data());
    }
    setLoading(false);
  };

  const updateUser = async () => {
    await db
      .collection("customers")
      .doc(user.uid.substring(0, 20))
      .update({
        mobileNumber,
        email,
      })
      .then(() => {
        setMessage("User profile updated");
        const user = firebase.auth().currentUser;
        // user
        //   .updateProfile({
        //     phoneNumber: mobileNumber,
        //   })
        //   .then(() => console.log("phone number updated"))
        //   .catch((error) => console.log(error));
        // console.log(user);

        user
          .updateEmail(email)
          .then(() => console.log("email updated"))
          .catch((error) => setMessage(error.message));
      })
      .catch((error) => setError(error.message));
  };

  const addNewAddress = async () => {
    addresses.push({
      address,
      city,
      country,
      postalCode,
      province,
    });
    // console.log(addresses);

    await db
      .collection("customers")
      .doc(user.uid.substring(0, 20))
      .update({
        addresses,
      })
      .then(() => {
        setMessage("User profile updated");
      })
      .catch((error) => {
        setError(error.message);
      });
    setNewAddress(!newAddress);
    setCountry("");
    setCity("");
    setProvince("");
    setAddress("");
    setPostalCode("");
  };

  useEffect(() => {
    if (!user) {
      history.push("/signin");
    } else {
      getUser();
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    updateUser();
  };

  const updateHandler = (e) => {
    e.preventDefault();

    updateUser();
  };

  const isInvalid =
    country === "" ||
    province === "" ||
    city === "" ||
    postalCode === "" ||
    address === "";

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3 className="mb-3">User Profile</h3>
          {message && <Message variant="info">{message}</Message>}
          {error && <Message>{error}</Message>}
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={submitHandler}>
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

              <Button
                type="button"
                variant="primary rounded-pill"
                onClick={updateHandler}
                className="mb-3"
              >
                Update
              </Button>

              <Form.Group controlId="addresses">
                <Form.Label className="mb-3">Shipping Addresses</Form.Label>
                <br />

                {addresses?.map((address) => (
                  <Form.Control
                    key={address.address}
                    as="textarea"
                    rows={3}
                    placeholder="Address"
                    defaultValue={`${address.address} 
${address.city}, ${address.province}
${address.postalCode}`}
                    className="mb-2"
                  />
                ))}

                {/* {addresses.map((item) => (
                  <>
                    <Form.Label>Address</Form.Label>
                    <Form.Row>
                      <Col xs={12} md={4}>
                        <Form.Group controlId="country">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Country"
                            value={item.country}
                            // onChange={(e) => setCountry(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={4}>
                        <Form.Group controlId="city">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter City"
                            value={item.city}
                            // onChange={(e) => setCity(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={4}>
                        <Form.Group controlId="postalCode">
                          <Form.Label>Postal Code</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Postal Code"
                            value={item.postalCode}
                            // onChange={(e) => setPostalCode(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="province">
                          <Form.Label>Province</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Province"
                            value={item.province}
                            // onChange={(e) => setProvince(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="adress">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Adress"
                            value={item.address}
                            // onChange={(e) => setAddress(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Form.Row>
                  </>
                ))} */}
              </Form.Group>

              <Button
                type="button"
                variant="primary rounded-pill"
                onClick={() => setNewAddress(!newAddress)}
              >
                Add New Address
              </Button>

              {newAddress && (
                <Form.Group controlId="newaddresses" className="mt-3">
                  <Form.Row>
                    <Col xs={12} md={4}>
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
                    <Col xs={12} md={4}>
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
                    <Col xs={12} md={4}>
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

                    <Col xs={12} md={6}>
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
                    <Col xs={12} md={6}>
                      <Form.Group controlId="adress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Adress"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Button
                    type="button"
                    variant="primary rounded-pill"
                    onClick={addNewAddress}
                    className="float-right"
                    disabled={isInvalid}
                  >
                    Submit
                  </Button>
                </Form.Group>
              )}
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
