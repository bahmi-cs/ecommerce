import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Message, Loader } from "../components";
import { FirebaseContext } from "../context/firebase";
import { useAuthListener } from "../hooks";

const OrderScreen = () => {
  const { firebase } = useContext(FirebaseContext);
  const db = firebase.firestore();
  const { user } = useAuthListener();

  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getItems = async () => {
      const allOrders = [];

      await db
        .collection("orders")
        .where("customerID", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((order) => {
            let currentID = order.id;
            let appObj = { ...order.data(), ["id"]: currentID };
            allOrders.push(appObj);
          });
          setOrderItems(allOrders);
          console.log(allOrders);

          // setOrderItems(querySnapshot.docs.map((doc) => doc.data()));
          // console.log(querySnapshot.docs.map((doc) => doc.data()));
        });
    };
    getItems();
  }, []);

  return (
    <Row>
      <Col>
        <h1>Orders</h1>
        {orderItems.length === 0 ? (
          <Col md={6} lg={6} className="mx-auto">
            <Message variant="info">
              <div className="text-center">
                Your order is empty <Link to="/">Go Back</Link>
              </div>
            </Message>
          </Col>
        ) : (
          <ListGroup variant="flush">
            {orderItems.map((item) => (
              <Card className="mb-3" key={item.itemID}>
                <Row className="d-flex align-items-center">
                  <Col md={2}>
                    <Image
                      className="pl-2"
                      src={item.imagesUrl[0]}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>

                  <Col md={4}>
                    <div className="mb-1">{item.date}</div>
                    <h5 className="mb-1">Order # {item.id}</h5>
                    {/* <h5> {item.name}</h5> */}
                    <div>
                      <strong>Item ID: </strong>
                      {item.itemID}
                    </div>
                    <div>
                      <strong>Barcode: </strong>
                      {item.item_barcode}
                    </div>
                    <div>
                      <strong>Condition: </strong>
                      {item.item_condition}
                    </div>
                    <div>
                      <strong>Quantity: </strong>
                      {item.item_quantity}
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="row">
                      <div className="col-md-12 d-flex my-1">
                        <strong>Status: </strong>
                        <div className="ml-auto">{item.item_status}</div>
                      </div>
                    </div>
                    <Card className="mb-2 mt-1">
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <div className="col-md-12 d-flex">
                              <strong className="mr-1">Seller: </strong>{" "}
                              {item.seller} <br />
                              {/* {"3146 Orleans Rd"}
                              <br />
                              {"Mississauga, ON"}
                              <br />
                              {"L5L 5L4"} */}
                            </div>
                          </Row>
                          {/* <strong className="mr-1">Store ID: </strong>{" "}
                          {item.store_id} */}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="mb-2 mt-1 mr-1">
                      <ListGroup variant="flush">
                        <strong className="pl-1">Sales Proceeds </strong>
                        <ListGroup.Item>
                          <div className="col-md-12 d-flex">
                            <strong>Subtotal: </strong>
                            <div className="ml-auto">
                              CAD$
                              {(
                                Number(item.item_price) *
                                Number(item.item_quantity)
                              ).toFixed(2)}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="ml-3">Shipping:</div>
                            <div className="mr-3">
                              CAD$
                              {(
                                Number(item.item_price) *
                                Number(item.item_quantity)
                              ).toFixed(2) > 35
                                ? 0
                                : 10}
                            </div>
                          </div>
                          <hr
                            style={{
                              borderTop: "2px solid #000000",
                            }}
                          />
                          <div className="col-md-12 d-flex mt-2">
                            <h4>Total: </h4>
                            <div className="ml-auto">
                              CAD$
                              {Number(
                                Number(
                                  (
                                    Number(item.item_price) *
                                    Number(item.item_quantity)
                                  ).toFixed(2)
                                ) > 35
                                  ? 0
                                  : 10
                              ) +
                                Number(
                                  (
                                    Number(item.item_price) *
                                    Number(item.item_quantity)
                                  ).toFixed(2)
                                )}
                            </div>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                </Row>
              </Card>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default OrderScreen;
