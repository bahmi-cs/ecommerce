import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { FirebaseContext } from "../context/firebase";
import { Message } from "../components";
import * as ROUTES from "../constants/routes";
import { useAuthListener } from "../hooks";

const AddItemScreen = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthListener();

  const db = firebase.firestore();

  const [title, setTitle] = useState("");
  const [barcode, setBarcode] = useState("");
  const [pictures, setPictures] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);

  const isInvalid =
    title === "" ||
    price === "" ||
    discountedPrice === "" ||
    description === "" ||
    category === "" ||
    quantity === "" ||
    condition === "" ||
    status === "";

  async function addToItemsCollection() {
    await db.collection("items").doc(user.uid).set({
      user: user.uid,
      title: title,
      barcode: barcode,
      pictures: pictures,
      price: price,
      discountedPrice: discountedPrice,
      description: description,
      category: category,
      quantity: quantity,
      condition: condition,
      status: status,
    });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      addToItemsCollection();
      setMessage("Item added successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h3 className="mb-3">Add New Item</h3>

          <Form.Row>
            <Col xs={12} md={6}>
              {message && <Message variant="success">{message}</Message>}
              {error && <Message>{error}</Message>}
            </Col>
          </Form.Row>
          <Form onSubmit={submitHandler}>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="barcode">
                  <Form.Label>Barcode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Barcode"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="pictures">
                  <Form.Label>Pictures</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Pictures"
                    value={pictures}
                    onChange={(e) => setPictures(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="discountedPrice">
                  <Form.Label>Discounted Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Discounted Price"
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="condition">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Button
              disabled={isInvalid}
              type="submit"
              className="float-right"
              variant="primary"
            >
              Add Item
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddItemScreen;
