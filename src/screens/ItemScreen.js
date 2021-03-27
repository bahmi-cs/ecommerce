import React, { useState, useEffect, useContext } from "react";
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
import { Link, useHistory } from "react-router-dom";
import { useAuthListener } from "../hooks";
import { FirebaseContext } from "../context/firebase";

const ItemScreen = ({ match }) => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const db = firebase.firestore();
  const { user } = useAuthListener();

  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const product = {
    storeId: "298910",
    storeName: "Hudson Store",
    storeLocation: "Mississauga, ON",
    title: "Airpods Wireless Bluetooth Headphones",
    itemId: "662287-27122",
    barcode: "66228727122",
    pictures: "img",
    price: 40.0,
    discountedPrice: 35.0,
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    category: "Kids",
    quantity: 5,
    condition: "new",
    status: "pending",
  };

  const getProduct = async () => {
    const userRef = db.collection("items").doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      const product = doc.data();

      console.log("Document data:", doc.data());
    }
  };

  // const addToCart = (productId) => {
  //   let cartCopy = [...cartItems];

  //   const item = bagItems.find((item) => item.itemId === productId);

  //   let existingItem = cartCopy.find(
  //     (cartItem) => cartItem.itemId === productId
  //   );

  //   if (existingItem) {
  //     existingItem.qty += qty; //update item
  //   } else {
  //     //if item doesn't exist, simply add it
  //     cartCopy.push(item);
  //   }

  //   setCartItems(cartCopy);

  //   let stringCart = JSON.stringify(cartCopy);
  //   localStorage.setItem("cart", stringCart);
  // };

  const addToCartHandler = () => {
    let cartCopy = [...cartItems];

    // const item = bagItems.find((item) => item.itemId === product.itemId);

    let existingItem = cartCopy.find(
      (cartItem) => cartItem.itemId === product.itemId
    );

    if (existingItem) {
      existingItem.quantity += qty; //update item
    } else {
      //if item doesn't exist, simply add it
      product.quantity = Number(qty);
      cartCopy.push(product);
    }

    setCartItems(cartCopy);

    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);

    history.push(`/bag`);
    // history.push(`/bag/${match.params.id}?qty=${qty}`);
  };

  useEffect(() => {
    getProduct();
    setLoading(false);
  }, []);

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
                  <h3>{product.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Item ID: </strong>
                  {product.itemId}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Barcode: </strong>
                  {product.barcode}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong> <del>CAD${product.price}</del>
                  <strong className="ml-2" style={{ color: "red" }}>
                    CAD${product.discountedPrice}
                  </strong>{" "}
                  <br />
                  (Including Taxes and Fees)
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Seller: </strong>
                  {product.storeName} <br />
                  {product.storeLocation}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Store ID:</strong> {product.storeId}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong>
                  {product.description}
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
                    <strong>Condition:</strong> <br /> {product.condition}
                  </ListGroup.Item>
                  {/* <ListGroup.Item>
                    <Row>
                      <Col className="font-weight-bold">Quantity</Col>
                      <Col>
                        <Form.Control as="select">
                          <option>1</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item> */}
                  {product.quantity > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
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
                              [...Array(product.quantity).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.quantity === 0}
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
