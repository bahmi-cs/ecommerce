import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Message } from "../components";
import sampleImage from "../assets/img/airpods.jpg";

const OrderScreen = () => {
  const orderItems = [
    {
      date: "Wednesday Feb 25, 2021",
      orderId: "662287-271222-5278189",
      name: "Airpods Wireless Bluetooth Headphones",
      itemId: "662287-271222",
      barcode: "6622872712225278189",
      condition: "New",
      seller: "Hudson Store",
      sellerAddress: "Hudson Store",
      storeId: "298910",
      status: "On Delivery",
      qty: 1,
      countInStock: 10,
      subtotal: 15.41,
      shipping: 2.0,
    },
    {
      date: "Wednesday Feb 25, 2021",
      orderId: "662287-271222-5278189",
      name: "Airpods Wireless Bluetooth Headphones",
      itemId: "662287-271222",
      barcode: "6622872712225278189",
      condition: "New",
      seller: "Hudson Store",
      sellerAddress: "Hudson Store",
      storeId: "298910",
      status: "On Delivery",
      qty: 1,
      countInStock: 10,
      subtotal: 15.41,
      shipping: 2.0,
    },
    {
      date: "Wednesday Feb 25, 2021",
      orderId: "662287-271222-5278189",
      name: "Airpods Wireless Bluetooth Headphones",
      itemId: "662287-271222",
      barcode: "6622872712225278189",
      condition: "New",
      seller: "Hudson Store",
      sellerAddress: "Hudson Store",
      storeId: "298910",
      status: "On Delivery",
      qty: 1,
      countInStock: 10,
      subtotal: 15.41,
      shipping: 2.0,
    },
  ];

  return (
    <Row>
      <Col>
        <h1>Orders</h1>
        {orderItems.length === 0 ? (
          <Message variant="info">
            Your order is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {orderItems.map((item) => (
              <Card className="mb-3" key={item.id}>
                <Row className="d-flex align-items-center">
                  <Col md={2}>
                    <Image
                      className="pl-2"
                      src={sampleImage}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>

                  <Col md={4}>
                    <div className="mb-1">{item.date}</div>
                    <h4 className="mb-1">Order # {item.orderId}</h4>
                    {/* <h5> {item.name}</h5> */}
                    <div>
                      <strong>Item ID: </strong>
                      {item.itemId}
                    </div>
                    <div>
                      <strong>Barcode: </strong>
                      {item.itemId}
                    </div>
                    <div>
                      <strong>Condition: </strong>
                      {item.condition}
                    </div>
                    <div>
                      <strong>Quantity: </strong>
                      {item.qty}
                    </div>
                    <hr class="hr-primary" />
                  </Col>
                  <Col md={3}>
                    <div class="row">
                      <div class="col-md-12 d-flex my-1">
                        <strong>Status: </strong>
                        <div class="ml-auto">{item.status}</div>
                      </div>
                    </div>
                    <Card className="mb-2 mt-1">
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <div class="col-md-12 d-flex">
                              <strong className="mr-1">Seller: </strong>{" "}
                              {item.seller} <br />
                              {"3146 Orleans Rd"}
                              <br />
                              {"Mississauga, ON"}
                              <br />
                              {"L5L 5L4"}
                            </div>
                          </Row>
                          <strong className="mr-1">Store ID: </strong>{" "}
                          {item.storeId}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="mb-2 mt-1 mr-1">
                      <ListGroup variant="flush">
                        <strong className="pl-1">Sales Proceeds </strong>
                        <ListGroup.Item>
                          <div class="col-md-12 d-flex">
                            <strong>Subtotal: </strong>
                            <div class="ml-auto">
                              CAD$
                              {item.subtotal.toFixed(2)}
                            </div>
                          </div>
                          <div class="d-flex justify-content-between">
                            <div className="ml-3">Shipping:</div>
                            <div className="mr-3">
                              CAD${item.shipping.toFixed(2)}
                            </div>
                          </div>
                          <hr
                            style={{
                              borderTop: "2px solid #000000",
                            }}
                          />
                          <div class="col-md-12 d-flex mt-2">
                            <h4>Total: </h4>
                            <div class="ml-auto">
                              CAD${(item.subtotal + item.shipping).toFixed(2)}
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
