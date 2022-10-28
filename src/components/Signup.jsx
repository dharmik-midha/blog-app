import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";
import "../ckeditor.css";
import { reset, signup } from "../features/auth/authSlice";
import blogSvg2 from "../images/about1.png";
import blogSvg1 from "../images/about2.png";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [err, setErr] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      // dispatch(m)
      toast.info(message);
      navigate("/login");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const validateForm = (values) => {
    const errors = {};

    //regex
    const nameRegex = /^[a-zA-Z ]{3,}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    //test regex
    !nameRegex.test(values?.name.trim()) &&
      (errors.name = "Name must contain a-z, A-Z or Spaces.");
    !emailRegex.test(values?.email.trim()) &&
      (errors.email = "Email must contain @ and .");
    !passwordRegex.test(values?.password.trim()) &&
      (errors.password =
        "Password must contain 1Uppercase, 1Lowercase, 1Special Character and minimum 8 Characters.");
    !passwordRegex.test(values?.cPassword.trim()) &&
      (errors.cPassword =
        "Password must contain 1Uppercase, 1Lowercase, 1Special Character and minimum 8 Characters.");
    values.password.trim() !== values.cPassword.trim() &&
      (errors.cPassword = "Password and Confirm Password doesn't match.");
    values.name === "" && (errors.name = "Name Required");
    values.email === "" && (errors.email = "Email Required");
    values.password === "" && (errors.password = "Password Required");
    values.cPassword === "" && (errors.cPassword = "Confirm Password Required");

    return errors;
  };

  const handleChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const errors = validateForm(signupForm);
    setErr(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(signup(signupForm));
    }
  };
  return (
    <Container fluid className="bg-light d-flex cont justify-content-around">
      <div className="d-flex component justify-content-center login-svg-bg ">
        <div
          className="w-100 h-100 position-relative "
          style={{ minHeight: "60vh" }}
        >
          <img
            src={blogSvg1}
            alt="svg1"
            className="position-absolute top-50 start-50 translate-middle z-index-10 w-80"
          />
          <img
            src={blogSvg2}
            alt="svg1"
            className="position-absolute start-60 top-60  translate-middle z-index-10 w-80"
          />
        </div>
      </div>
      <div
        className="d-flex component justify-content-center align-items-center p-3"
        style={{ minHeight: "80vh" }}
      >
        <Card className="bg-form " style={{ width: "400px" }}>
          <Card.Body>
            <div className="fs-4 text-center cursive">Signup Here...</div>
            <div className="m-auto text-center">
              <img
                src="https://www.svgrepo.com/show/244093/login.svg"
                alt="loginimg"
                className="w-25 "
              />
            </div>
            <Form className="p-3">
              <Form.Group className="mb-2">
                <Form.Label htmlFor="subject">Name</Form.Label>
                <Form.Control
                  name="name"
                  className={err?.name && "border-danger"}
                  value={signupForm.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  type="text"
                />
                <Row>
                  <small className="h-10  text-danger">{err?.name}</small>
                </Row>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="subject">Email</Form.Label>
                <Form.Control
                  name="email"
                  className={err?.email && "border-danger"}
                  value={signupForm.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  type="email"
                />
                <Row>
                  <small className="h-10  text-danger">{err?.email}</small>
                </Row>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="image">Password</Form.Label>
                <Form.Control
                  name="password"
                  className={err?.password && "border-danger"}
                  value={signupForm.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter Your Password"
                />
                <Row>
                  <small className="h-10  text-danger">{err?.password}</small>
                </Row>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="image">Confirm Password</Form.Label>
                <Form.Control
                  name="cPassword"
                  className={err?.cPassword && "border-danger"}
                  value={signupForm.cPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter Your Confirm Password"
                />
                <Row>
                  <small className="h-10  text-danger">{err?.cPassword}</small>
                </Row>
              </Form.Group>
              <Row className="p-2">
                <button
                  type="submit"
                  className="btn bg-grey btn-lg btn-dark border-0 my-2"
                  onClick={handleSignup}
                >
                  Signup
                </button>
              </Row>
              <Row>
                <Col>
                  Already have an account?{" "}
                  <Link
                    className="d-inline-block text-decoration-none"
                    to="/login"
                  >
                    Login
                  </Link>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Signup;
