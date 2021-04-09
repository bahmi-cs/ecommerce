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
  const [storeName, setStoreName] = useState("");
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [images, setImages] = useState("");

  const productId = match.params.id;

  // .then((snapshot) => {
  //   snapshot.docs.forEach((item) => {
  //     let currentID = item.id;
  //     let appObj = { ...item.data(), ["id"]: currentID };
  //     allItems.push(appObj);
  //     console.log(appObj);
  //   });
  //   setStoreItems(allItems);
  // });

  const getStore = async (store_id) => {
    const storeRef = db.collection("stores").doc(store_id);
    const doc = await storeRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      const { storeName } = doc.data();
      setStoreName(storeName);
      console.log("Document data:", doc.data());
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      let item = {};

      await db
        .collection("items")
        .doc(productId)
        .get()
        .then((snapshot) => {
          // console.log(snapshot.id);
          item = snapshot.data();
          item.id = snapshot.id;
          getStore(item.store_id);
          console.log(item);
          // console.log(Object.values(snapshot.data().imagesUrl)[0]);
          setImages(Object.values(snapshot.data().imagesUrl)[0]);
          setProduct(item);
        });
    };
    getProduct();
    setLoading(false);
  }, []);

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
              <Image src={images} alt={product.title} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Item ID: </strong>
                  {product.id}
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
                  <strong>Seller: {storeName}</strong>
                  {product.storeName} <br />
                  {product.storeLocation}
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <strong>Store ID:</strong> {product.store_id}
                </ListGroup.Item> */}
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
