import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container fluid >
      <Row>
        <Col md={8} className=" m-auto text-center ">
          <div className="Page404">
            <h1 className="text-center p-4" style={{ fontSize: "60px" }}>
              404
            </h1>
          </div>
          <div className="font-avro">
            <h1 className="fs-1 p-0">Look like you're lost</h1>
            <p className="fs-6 p-0">
              the page you are looking for is not available!
            </p>
            <Link className="btn btn-green px-4 text-decoration-none" to='/'>Go to Home</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
