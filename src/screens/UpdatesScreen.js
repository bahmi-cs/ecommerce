import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Loader, Message } from "../components";

const UpdatesScreen = ({ history, match }) => {
  const [updates, setUpdates] = useState([]);
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

  return (
    <>
      <h3 className="mb-3">Updates</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Col>
              <Card className="my-3 p-3 rounded">
                <Card.Body>
                  <Card.Title as="h5">
                    <strong>{"Update 1"}</strong>
                  </Card.Title>

                  <Card.Text as="div">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="my-3 p-3 rounded">
                <Card.Body>
                  <Card.Title as="h5">
                    <strong>{"Update 2"}</strong>
                  </Card.Title>

                  <Card.Text as="div">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="my-3 p-3 rounded">
                <Card.Body>
                  <Card.Title as="h5">
                    <strong>{"Update 3"}</strong>
                  </Card.Title>

                  <Card.Text as="div">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default UpdatesScreen;
