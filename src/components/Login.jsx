import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";
import "../ckeditor.css";
import { login, reset } from "../features/auth/authSlice";
import blogSvg1 from "../images/about1.png";
import blogSvg2 from "../images/about2.png";
import loginSvg from "../images/login.svg";
import Spinner from "./Spinner";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
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
      navigate("/blogs");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const validateForm = (values) => {
    const errors = {};

    //regex
    const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const PASSWORD_REGEX =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    //test regex
    if (!EMAIL_REGEX.test(values?.email.trim()))
      errors.email = "Email must contain @ and .";

    if (!PASSWORD_REGEX.test(values?.password.trim()))
      errors.password =
        "Password must contain 1Uppercase, 1Lowercase, 1Special Character and minimum 8 Characters ";

    if (values?.email.trim() === "") errors.email = "Email Required";
    if (values?.password.trim() === "") errors.password = "Password Required";

    return errors;
  };

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validateForm(loginForm);
    setErr(errors);

    if (Object.keys(errors).length === 0) {
      await dispatch(login(loginForm));
    }
  };

  if (isLoading) {
    console.log("true");
    return <Spinner />;
  }

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
        <Card className="bg-form" style={{ width: "400px" }}>
          <Card.Body>
            <div className="fs-4 text-center cursive">Login Here...</div>
            <div className="m-auto text-center">
              <img src={loginSvg} alt="loginimg" className="w-25 " />
            </div>
            <Form className="p-3">
              <Form.Group className="mb-2">
                <Form.Label htmlFor="subject">Email</Form.Label>
                <Form.Control
                  value={loginForm.email}
                  className={err?.email && "border-danger"}
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                />
                <Row>
                  <small className="h-10  text-danger">{err?.email}</small>
                </Row>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="image">Password</Form.Label>
                <Form.Control
                  value={loginForm.password}
                  name="password"
                  className={err?.password && "border-danger"}
                  type="password"
                  placeholder="Enter Your Password"
                  onChange={handleChange}
                />
                <Row>
                  <small className="h-10 text-danger">{err?.password}</small>
                </Row>
              </Form.Group>
              <Row className="p-2">
                <button
                  className="btn bg-grey btn-lg btn-dark border-0 my-2"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </Row>
              <Row>
                <Col>
                  Doesn't have an account?{" "}
                  <Link
                    className="d-inline-block text-decoration-none"
                    to="/signup"
                  >
                    Signup
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

export default Login;
