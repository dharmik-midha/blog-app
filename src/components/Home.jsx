import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import greenMain from "../images/green-main.png";
import img1 from "../images/green1.png";
import img2 from "../images/green2.png";
import img3 from "../images/green3.png";
import img4 from "../images/green4.png";
import img5 from "../images/green5.png";
import img6 from "../images/green6.png";
import img7 from "../images/green7.png";
import img8 from "../images/green8.png";
import "../App.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container fluid className="p-0 bg-green homeView h-100 user-select-none">
      <div>
        <Row className="m-0 flex-column-reverse flex-md-row">
          <Col className="p-2" md={3}>
            <div className="d-flex align-items-center  flex-column jusitfy-content-evenly">
              <img className="smallSvg align-self-start" src={img2} alt="cup" />
              <img
                className="smallSvg align-self-end"
                src={img1}
                alt="flower"
              />
              <img
                className="smallSvg align-self-start"
                src={img8}
                alt="ball"
              />
              <img className="smallSvg align-self-end" src={img5} alt="c" />
            </div>
          </Col>
          <Col
            className="align-items-center justify-content-between d-flex  flex-column-reverse flex-sm-column h-80"
            md={6}
          >
            <div className="w-100">
              <div className="mainHero text-light text-center">
                <p className="fw-light fs-1 m-2 ">
                  Publish your passions, your way
                </p>
                <p className="fs-5">
                  Create a unique and beautiful blog easily.
                </p>
                <Link to="/create" className="text-decoration-none btn btn-outline-light">
                  Create Blog
                </Link>
              </div>
            </div>
            <img src={greenMain} className="main align-self-end" alt="main" />
          </Col>

          <Col className="d-none d-sm-block p-2 " md={3}>
            <div className="d-flex  align-items-center  flex-column jusitfy-content-evenly">
              <img className="smallSvg align-self-start" src={img7} alt="a" />
              <img className="smallSvg align-self-end" src={img3} alt="footwear" />
              <img
                className="smallSvg align-self-start"
                width={"240px"}
                src={img4}
                alt="pic"
              />
              <img className="smallSvg align-self-end" src={img6} alt="b" />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Home;
