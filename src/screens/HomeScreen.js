import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Message, Loader } from "../components";
import { FirebaseContext } from "../context/firebase";
import { Link } from "react-router-dom";
import { useAuthListener } from "../hooks";

const HomeScreen = () => {
  const { firebase } = useContext(FirebaseContext);
  const db = firebase.firestore();
  const { user } = useAuthListener();

  const [province, setProvince] = useState("");
  const [stores, setStores] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUser = async () => {
    const userRef = db.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      const { province } = doc.data();
      setProvince(province);
      console.log("Document data:", doc.data());
    }
  };

  useEffect(() => {
    getUser();
  });

  useEffect(() => {
    const allStores = [];
    db.collection("stores")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((store) => {
          let currentID = store.id;
          let appObj = { ...store.data(), ["id"]: currentID };
          allStores.push(appObj);

          // allStores.push(store.data());
        });
        setStores(allStores);
      });
  }, []);

  return (
    <>
      {stores.length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className="mb-3">
            <strong>
              Delivery to: <br />
              <strong>{province}</strong>
            </strong>
          </div>
          <Row>
            {stores.map((store) => (
              <Col key={store.id} sm={12} md={6} lg={2} xl={2}>
                <Card className="my-3 p-1 rounded text-center">
                  <Link to={`/store/${store.id}`}>
                    <Card.Img
                      src={store.storeLogo}
                      alt={store.storeName}
                      valiant="top"
                    />
                  </Link>

                  <Card.Body>
                    <Link to={`/store/${store.id}`}>
                      <Card.Text as="div">
                        <strong>{store.storeName}</strong>
                      </Card.Text>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
