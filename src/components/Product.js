import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import sampleImage from "../assets/img/airpods.jpg";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={sampleImage} valiant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Text as="div">
            <strong>{product.title}</strong>
          </Card.Text>
        </Link>

        {/* <Card.Text as="div"></Card.Text> */}

        <Card.Text as="h6" className="mt-2">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
