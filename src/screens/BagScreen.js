import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  ListGroup,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { Message } from "../components";
import sampleImage from "../assets/img/airpods.jpg";

const BagScreen = ({ match, location }) => {
  const [cartItems, setCartItems] = useState([]);
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const bagItems = [
    {
      date: "Wednesday Feb 24, 2021",
      name: "Airpods Wireless Bluetooth Headphones",
      price: 161,
      seller: "Hudson Store",
      qty: 1,
      countInStock: 10,
    },
    {
      date: "Wednesday Feb 24, 2021",
      name: "Airpods Wireless Bluetooth Headphones",
      price: 161,
      seller: "Hudson Store",
      qty: 1,
      countInStock: 10,
    },
    {
      date: "Wednesday Feb 24, 2021",
      name: "Airpods Wireless Bluetooth Headphones",
      price: 161,
      seller: "Hudson Store",
      qty: 1,
      countInStock: 10,
    },
  ];

  //   useEffect(() => {
  //     if (productId) {
  //       dispatch(addToCart(productId, qty));
  //     }
  //   }, [dispatch, productId, qty]);

  //   const removeItemHandler = (id) => {
  //     dispatch(removeFromCart(id));
  //   };

  //   const checkoutHandler = () => {
  //     history.push("/login?redirect=shipping");
  //   };

  return (
    <Row>
      <Col md={8}>
        <h1>Bag</h1>
        {bagItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {bagItems.map((item) => (
              <Card className="mb-3" key={item.id}>
                <Row className="d-flex align-items-center">
                  <Col md={3}>
                    <Image src={sampleImage} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={5}>
                    <div className="mb-1">{item.date}</div>
                    <Link to={`/product/${item.name}`}>{item.name}</Link>
                    <br />
                    <div className="mt-3">
                      <strong>Price: </strong>CAD${item.price}
                    </div>
                    <div>
                      <strong>Seller: </strong>
                      {item.seller}
                    </div>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        // dispatch(
                        //   addToCart(item.product, Number(e.target.value))
                        // );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      //   onClick={() => removeItemHandler(item.product)}
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
      <Col md={4}>
        <Card className="mb-2">
          <ListGroup variant="flush">
            <ListGroup.Item>
              {/* <h2></h2>
              <h5 className="float-right"></h5> */}
              <div class="row">
                <div class="col-md-12 d-flex">
                  <strong>Shipping: </strong>
                  <div class="ml-auto">Same day</div>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className="mb-2">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <div class="col-md-12 d-flex">
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
                <div class="col-md-12 d-flex">
                  <strong>Subtotal: </strong>
                  <div class="ml-auto">
                    CAD$
                    {bagItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>
                </div>
                <div class="col-md-12 d-flex">
                  <strong>Shipping: </strong>
                  <div class="ml-auto">CAD$00.00</div>
                </div>
                <div class="col-md-12 d-flex mt-2">
                  <h4>Total: </h4>
                  <div class="ml-auto">CAD$483.00</div>
                </div>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn d-flex mx-auto"
                disabled={bagItems.length === 0}
                // onClick={checkoutHandler}
              >
                Pay with iPay
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default BagScreen;
