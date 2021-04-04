import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Form, Card, Button } from "react-bootstrap";
import { Message, Product, Loader } from "../components";
import { FirebaseContext } from "../context/firebase";

const StoreScreen = ({ match }) => {
  const { firebase } = useContext(FirebaseContext);
  const db = firebase.firestore();

  const [store, setStore] = useState({});
  const [storeItems, setStoreItems] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storeId = match.params.id;
  // console.log(storeId);

  useEffect(() => {
    const getStore = async () => {
      await db
        .collection("stores")
        .doc(storeId)
        .get()
        .then((snapshot) => {
          console.log(snapshot.data());
          setStore(snapshot.data());
        });
    };
    getStore();
    setLoading(false);
  }, []);

  useEffect(() => {
    const getStoreItems = async () => {
      // setLoading(true);
      const allItems = [];

      await db
        .collection("items")
        .where("store_id", "==", storeId)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((item) => {
            let currentID = item.id;
            let appObj = { ...item.data(), ["id"]: currentID };
            allItems.push(appObj);
            console.log(appObj);
          });
          setStoreItems(allItems);
        });
      setLoading(false);
    };
    getStoreItems();
  }, []);

  // useEffect(() => {
  //   const getStoreItems = async () => {
  //     setLoading(true);
  //     const storeCollection = await db
  //       .collection("items")
  //       .where("store_id", "==", storeId)
  //       .get();
  //     setStoreItems(
  //       storeCollection.docs.map((doc) => {
  //         console.log(doc.data());
  //         return doc.data();
  //       })
  //     );
  //     setLoading(false);
  //   };
  //   getStoreItems();
  // }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={3}>
            <Card className="p-3 rounded">
              <Card.Img src={store.storeLogo} valiant="top" />

              <Card.Body className="text-center">
                <Card.Text as="div">
                  <strong>{store.storeName}</strong>
                </Card.Text>

                <Card.Text as="h6">
                  ID: <br /> {storeId}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mt-4 rounded">
              <Card.Body style={{ padding: ".5rem" }}>
                <Card.Text as="div">
                  <strong>Filter</strong>
                  <br />
                  Price
                  <Form>
                    <Row className="p-2">
                      <Col>
                        {/* <Form.Label className="my-1 mr-2" htmlFor="from">
                      From
                    </Form.Label> */}
                        <Form.Control placeholder="From" />
                      </Col>
                      <Col>
                        {/* <Form.Label className="my-1 mr-2" htmlFor="from">
                      To
                    </Form.Label> */}
                        <Form.Control placeholder="To" />
                      </Col>
                    </Row>
                  </Form>
                  Sort <br />
                  <div className="d-flex justify-content-between p-2">
                    <Button variant="outline-primary" size="sm">
                      Low to High
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      High to Low
                    </Button>
                  </div>
                  {/* <Link to="/"></Link> */}
                  {/* <Link to="/"></Link> */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={9}>
            {storeItems?.length === 0 ? (
              <Message variant="info">
                The store is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <>
                <Row>
                  {storeItems?.map((product) => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default StoreScreen;
