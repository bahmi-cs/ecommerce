import React from "react";
import { Toast } from "react-bootstrap";

export default function Toast() {
  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "100px",
        }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={5000}
          autohide
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <Toast.Header className="success bg-success">
            <i class="far fa-check-circle text-white mr-2"></i>
            <strong className="mr-auto text-white">Success</strong>
            <small className="text-white">Just now</small>
          </Toast.Header>
          <Toast.Body>Account created successfully!</Toast.Body>
        </Toast>
      </div>
    </>
  );
}
