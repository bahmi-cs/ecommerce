import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import { Message, Product } from "../components";
import sampleImage from "../assets/img/airpods.jpg";

const StoreScreen = ({ match, location }) => {
  const [cartItems, setCartItems] = useState([]);
  // const productId = match.params.id;
  // const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const storeItems = [
    {
      storeId: "298910",
      storeName: "Hudson Store",
      itemId: "662287-27122",
      title: "Airpods Wireless Bluetooth Headphones",
      price: 40.0,
    },
    {
      storeId: "298910",
      storeName: "Hudson Store",
      itemId: "662287-27122",
      title: "Airpods Wireless Bluetooth Headphones",
      price: 40.0,
    },
    {
      storeId: "298910",
      storeName: "Hudson Store",
      itemId: "662287-27122",
      title: "Airpods Wireless Bluetooth Headphones",
      price: 40.0,
    },
    {
      storeId: "298910",
      storeName: "Hudson Store",
      itemId: "662287-27122",
      title: "Airpods Wireless Bluetooth Headphones",
      price: 40.0,
    },
    {
      storeId: "298910",
      storeName: "Hudson Store",
      itemId: "662287-27122",
      title: "Airpods Wireless Bluetooth Headphones",
      price: 40.0,
    },
    {
      storeId: "298910",
      storeName: "Hudson Store",
      itemId: "662287-27122",
      title: "Airpods Wireless Bluetooth Headphones",
      price: 40.0,
    },
  ];

  //   useEffect(() => {
  //     if (productId) {
  //       dispatch(addToCart(productId, qty));
  //     }
  //   }, [dispatch, productId, qty]);

  return (
    <Row>
      <Col md={3}>
        <Card className="p-3 rounded">
          <Card.Img src={sampleImage} valiant="top" />

          <Card.Body className="text-center">
            <Card.Text as="div">
              <strong>{storeItems[0].storeName}</strong>
            </Card.Text>

            {/* <Card.Text as="div"></Card.Text> */}

            <Card.Text as="h6">ID: {storeItems[0].storeId}</Card.Text>
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
              <div class="d-flex justify-content-between p-2">
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
        {storeItems.length === 0 ? (
          <Message variant="info">
            The store is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <>
            <Row>
              {storeItems.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

export default StoreScreen;