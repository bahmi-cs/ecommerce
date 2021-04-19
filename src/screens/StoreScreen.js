import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { Message, Product, Loader } from "../components";
import { FirebaseContext } from "../context/firebase";

const StoreScreen = ({ match }) => {
  const { firebase } = useContext(FirebaseContext);
  const db = firebase.firestore();

  const [store, setStore] = useState({});
  const [storeItems, setStoreItems] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [error, setError] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

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

  const priceFromTo = (from, to) => {
    let filteredItems = storeItems?.filter(
      (item) => item.price >= Number(from) && item.price <= Number(to)
    );
    console.log(filteredItems);
    setStoreItems(filteredItems);
    setFilter(() => !filter);
  };

  const sortByLowToHigh = () => {
    let lowToHigh = storeItems?.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
    setStoreItems(lowToHigh);
    setFilter(() => !filter);
  };

  const sortByHighToLow = () => {
    let highToLow = storeItems?.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
    setStoreItems(highToLow);
    setFilter(() => !filter);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={4}>
            <Card className="p-3 rounded">
              <Card.Img src={store.storeLogo} valiant="top" />

              <Card.Body className="text-center">
                <Card.Text as="h6">
                  <strong>{store.storeName}</strong>
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
                    <Row className="">
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="From"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                          placeholder="To"
                        />
                      </Col>
                      <Col>
                        <Button
                          className="mt-1"
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            priceFromTo(from, to);
                          }}
                        >
                          Go
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  Sort <br />
                  <div className="d-flex justify-content-between p-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => {
                        sortByLowToHigh();
                      }}
                    >
                      Low to High
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => {
                        sortByHighToLow();
                      }}
                    >
                      High to Low
                    </Button>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
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
