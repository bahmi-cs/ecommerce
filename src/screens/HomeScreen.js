import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Card,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Message, Loader } from "../components";
import { FirebaseContext } from "../context/firebase";
import { Link } from "react-router-dom";
import { useAuthListener } from "../hooks";

const HomeScreen = () => {
  const { firebase } = useContext(FirebaseContext);
  const db = firebase.firestore();
  const { user } = useAuthListener();

  const [province, setProvince] = useState("");
  const [stores, setStores] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const userRef = db.collection("customers").doc(user?.uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log("No such user!");

        const allStores = [];
        db.collection("stores")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((store) => {
              let currentID = store.id;
              let appObj = { ...store.data(), ["id"]: currentID };
              allStores.push(appObj);
            });
            setStores(allStores);
          });
      } else {
        const { addresses } = doc.data();
        setProvince(addresses[0].province);

        let allStores = [];
        db.collection("stores")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((store) => {
              let currentID = store.id;
              let appObj = { ...store.data(), ["id"]: currentID };
              allStores.push(appObj);
            });
            allStores = allStores.filter(
              (store) => store.province === addresses[0].province
            );
            setStores(allStores);
          });
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : stores.length === 0 ? (
        <Col md={6} lg={6} className="mx-auto">
          <Message variant="info">
            <div className="text-center">
              Sorry, no store available near you!
            </div>
          </Message>
        </Col>
      ) : (
        <>
          <Row className="mb-1">
            <Col>
              <div className="mb-3">
                {province ? (
                  <strong>
                    Delivery to: <br />
                    <strong>{province}</strong>
                  </strong>
                ) : undefined}
              </div>
            </Col>
            <Col>
              <Alert
                variant="light"
                className="border-secondary text-center shadow rounded"
              >
                Free Shipping for all orders over 35$
              </Alert>
            </Col>
            <Col></Col>
          </Row>

          <Row className="justify-content-md-center mb-3">
            <Col md="auto">
              <ToggleButtonGroup
                type="radio"
                size="sm"
                name="options"
                defaultValue={1}
              >
                <ToggleButton
                  className="mx-3"
                  variant="btn btn-outline-primary rounded-pill shadow"
                  value={1}
                >
                  Stores
                </ToggleButton>
                <ToggleButton
                  className="mx-3"
                  value={2}
                  variant="btn btn-outline-primary rounded-pill shadow"
                >
                  All
                </ToggleButton>
                <ToggleButton
                  className="mx-3"
                  value={3}
                  variant="btn btn-outline-primary rounded-pill shadow"
                >
                  Men's Fashion
                </ToggleButton>
                <ToggleButton
                  className="mx-3"
                  value={4}
                  variant="btn btn-outline-primary rounded-pill shadow"
                >
                  Electronic
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>

          <div className=""></div>
          <Row>
            {stores.map((store) => (
              <Col key={store.id} sm={12} md={6} lg={2} xl={2}>
                <Card className="my-3 p-1 rounded text-center">
                  <Link to={`/store/${store.id}`}>
                    <Card.Img
                      src={store.storeLogo}
                      alt={store.storeName}
                      valiant="top"
                    />
                  </Link>

                  <Card.Body>
                    <Link to={`/store/${store.id}`}>
                      <Card.Text as="div">
                        <strong>{store.storeName}</strong>
                      </Card.Text>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
