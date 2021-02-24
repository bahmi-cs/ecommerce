import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Loader, Message } from "../components";
import sampleImage from "../assets/img/airpods.jpg";

const ItemScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     if (successProductReview) {
  //       setRating(0);
  //       setComment("");
  //       dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
  //     }

  //     dispatch(listProductDetails(match.params.id));
  //   }, [dispatch, match, product]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-primary my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={sampleImage} alt={"product.name"} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{"Airpods Wireless Bluetooth Headphones"}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Item ID: </strong>
                  {"662287-27122"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Barcode: </strong>
                  {"66228727122"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong> <del>CAD${"161"}</del>
                  <strong className="ml-2" style={{ color: "red" }}>
                    CAD${"161"}
                  </strong>{" "}
                  <br />
                  (Including Taxes and Fees)
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Seller: </strong>
                  {"Hudson Store"} <br />
                  Mississauga, ON
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Store ID:</strong> {"198910"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong>{" "}
                  {
                    "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working"
                  }
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Shiping:</strong> <br /> {"Same-day delivery"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Returns:</strong> <br />{" "}
                    {"Please, contact seller for more info"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Condition:</strong> <br /> {"New"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className="font-weight-bold">Quantity</Col>
                      <Col>
                        <Form.Control as="select">
                          <option>1</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {
                              // if the count in stock is 5,
                              // this will give an array with [0,1,2,3,4]
                              [...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )} */}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      //   disabled={product.countInStock === 0}
                    >
                      Add To Bag
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ItemScreen;
