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
              <ListGroup.Item key={item.id}>
                <Row>
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
                  <Col md={2} className="d-flex align-items-center">
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
                  <Col md={2} className="d-flex align-items-center">
                    <Button
                      type="button"
                      variant="light"
                      //   onClick={() => removeItemHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
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
              <div class="row">
                <div class="col-md-12 d-flex">
                  <strong className="mr-2">Ship to: </strong> {"Tom Hanks"}{" "}
                  <br />
                  {"3146 Orleans Rd"}
                  <br />
                  {"Mississauga, ON"}
                  <br />
                  {"L5L 5L4"}
                </div>
              </div>
              <strong className="mr-2">Customer ID: </strong> 2956288910 <br />
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                {/* get total quantity */}
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              {/* get total price of all the items */}$
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                // onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default BagScreen;
