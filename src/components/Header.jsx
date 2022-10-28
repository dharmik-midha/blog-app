import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavbarBrand, NavItem } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";
import {reset as resetBlogs} from "../features/blogs/blogSlice";
import { useNavigate } from "react-router-dom";

import "../App.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const activeRoute = (val) =>
    location.pathname === val ? `pe-5 my-2 fw-bold` : `pe-5 my-2 `;
  const activeRouteIncl = (val) =>
    location.pathname.includes(val) ? `pe-5 my-2 fw-bold` : `pe-5 my-2 `;

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(resetBlogs());
    await dispatch(reset());
    navigate("/login");
  };

  return (
    <Navbar
      className={
        location.pathname === "/" ? "header-text-white" : "header-text-black"
      }
      expand="lg"
    >
      <Container fluid>
        <NavbarBrand className="user-select-none Logo fs-3 ps-2 border-0 ">
          <span className="ps-3">
            <img
              src="https://www.svgrepo.com/show/2605/blogger-big-logo.svg"
              className={location.pathname === "/" ? "filter" : "filter1"}
              alt="svgLogo"
            />
            logueur
          </span>
        </NavbarBrand>
        <NavbarToggle
          aria-controls="navbarScroll"
          className={location.pathname === "/" ? "text-light" : "text-dark"}
        />
        <NavbarCollapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0  " navbarScroll>
            <NavItem className={activeRoute("/")}>
              <Link to="/" className="text-decoration-none">
                Home
              </Link>
            </NavItem>
            {user && (
              <>
                <NavItem className={activeRouteIncl("/blogs")}>
                  <Link to="/blogs" className="text-decoration-none">
                    Blogs
                  </Link>
                </NavItem>
                <NavItem className={activeRouteIncl("/create")}>
                  <Link to="/create" className="text-decoration-none">
                    Create Blogs
                  </Link>
                </NavItem>
              </>
            )}
            <NavItem
              className={`${activeRouteIncl("/login")} ${activeRouteIncl(
                "/signup"
              )}`}
            >
              {user ? (
                <Link className="text-decoration-none" onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <Link to="/login" className="text-decoration-none">
                  Login {/* / Signup */}
                </Link>
              )}
            </NavItem>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default Header;
