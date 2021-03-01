import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Form, Card, Button } from "react-bootstrap";
import { Message, Product } from "../components";
import sampleImage from "../assets/img/airpods.jpg";

const HomeScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  // const productId = match.params.id;
  // const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const storeItems = [
    {
      storeId: "298910",
      storeName: "Hudson Store",
      storeLocation: "Mississauga, ON",
    },
    {
      storeId: "298910",
      storeName: "Hudson Store",
      storeLocation: "Mississauga, ON",
    },
    {
      storeId: "298910",
      storeName: "Hudson Store",
      storeLocation: "Mississauga, ON",
    },
    {
      storeId: "298910",
      storeName: "Hudson Store",
      storeLocation: "Mississauga, ON",
    },
    {
      storeId: "298910",
      storeName: "Hudson Store",
      storeLocation: "Mississauga, ON",
    },
    {
      storeId: "298910",
      storeName: "Hudson Store",
      storeLocation: "Mississauga, ON",
    },
    {
      storeId: "298910",
      storeName: "Hudson Store",
      storeLocation: "Mississauga, ON",
    },
  ];

  //   useEffect(() => {
  //     if (productId) {
  //       dispatch(addToCart(productId, qty));
  //     }
  //   }, [dispatch, productId, qty]);

  return (
    <Row>
      <Col>
        {storeItems.length === 0 ? (
          <Message variant="info">
            The store is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <>
            <div className="mb-3">
              <strong>
                Delivery to: <br />
                {storeItems[0].storeLocation}
              </strong>
            </div>
            <Row>
              {storeItems.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={2} xl={2}>
                  <Card className="my-3 p-1 rounded text-center">
                    <Link to={`/product/${product._id}`}>
                      <Card.Img src={sampleImage} valiant="top" />
                    </Link>

                    <Card.Body>
                      <Link to={`/product/${product._id}`}>
                        <Card.Text as="div">
                          <strong>{product.storeName}</strong>
                        </Card.Text>
                      </Link>

                      {/* <Card.Text as="div"></Card.Text> */}

                      <Card.Text as="h6" className="mt-2">
                        ID: {product.storeId}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

export default HomeScreen;
