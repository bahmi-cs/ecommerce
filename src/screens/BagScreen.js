import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Form,
  ListGroup,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import {
  PayPalButtons,
  usePayPalScriptReducer,
  FUNDING,
} from "@paypal/react-paypal-js";
import { Link, useHistory } from "react-router-dom";
import { useAuthListener } from "../hooks";
import { FirebaseContext } from "../context/firebase";
import { Message, Loader } from "../components";

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

const BagScreen = ({ match, location }) => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const db = firebase.firestore();
  const { user } = useAuthListener();

  const [cartItems, setCartItems] = useState([]);

  const [{ isPending }] = usePayPalScriptReducer();
  const [amount, setAmount] = useState(5);
  const [orderID, setOrderID] = useState(false);
  const productId = match.params.id;

  // console.log(productId, qty);

  let localCart = localStorage.getItem("cart");

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: amount,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const onSuccess = (payment) => {
    payment.console // Congratulation, it came here means everything's fine!
      .log("The payment was succeeded!", payment);
    this.props.clearCart();
    history.push("/");
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      alert("Transaction completed by " + details.payer.name.given_name + "!");
      // clear cart from localstore
      history.push("/");
    });
  };

  const removeItemHandler = (id) => {
    let cartCopy = [...cartItems];
    cartCopy = cartCopy.filter((item) => item.itemId != id);
    setCartItems(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartString);
  };

  useEffect(() => {
    localCart = JSON.parse(localCart);
    console.log(localCart);

    if (localCart) {
      setCartItems(localCart);
    }
  }, [localCart]);

  return (
    <Row>
      <Col md={8}>
        <h1>Bag</h1>

        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <Card className="mb-3" key={item.id}>
                <Row className="d-flex align-items-center">
                  <Col md={3}>
                    <Image
                      src={item.imagesUrl[0]}
                      alt={item.title}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={5}>
                    <div className="mb-1">{today}</div>
                    <h6>
                      <Link to={`/product/${item.id}`}>{item.title}</Link>
                    </h6>
                    <br />
                    <div className="">
                      <strong>Price: </strong>CAD${item.price}
                    </div>
                    <div>
                      <strong>Seller: </strong>
                      {item.storeName}
                    </div>
                  </Col>

                  <Col md={2}>
                    <Form.Control as="select" value={item.quantity}>
                      {<option>{item.quantity}</option>}
                      {/* {[...Array(item.quantity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))} */}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeItemHandler(item.itemId)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className="mt-3">
        <Card className="mb-2 mt-5">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className="row">
                <div className="col-md-12 d-flex">
                  <strong>Shipping: </strong>
                  <div className="ml-auto">Same day</div>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className="mb-2">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <div className="col-md-12 d-flex">
                  <strong className="mr-2">Ship to: </strong> {"Tom Hanks"}{" "}
                  <br />
                  {"3146 Orleans Rd"}
                  <br />
                  {"Mississauga, ON"}
                  <br />
                  {"L5L 5L4"}
                </div>
              </Row>
              <strong className="mr-2">Customer ID: </strong> 2956288910 <br />
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <div className="col-md-12 d-flex">
                  <strong>Subtotal: </strong>
                  <div className="ml-auto">
                    CAD$
                    {Number(
                      cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                    ).toFixed(2)}
                  </div>
                </div>
                <div className="col-md-12 d-flex">
                  <strong>Shipping: </strong>
                  <div className="ml-auto">CAD$00.00</div>
                </div>
                <div className="col-md-12 d-flex mt-2">
                  <h4>Total: </h4>
                  <div className="ml-auto">
                    CAD$
                    {Number(
                      cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      ) + 0
                    ).toFixed(2)}
                  </div>
                </div>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {isPending ? (
                <Loader />
              ) : (
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={createOrder}
                  fundingSource={FUNDING.PAYPAL}
                  onApprove={onApprove}
                />
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default BagScreen;
