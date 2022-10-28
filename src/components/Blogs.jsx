import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogs, resetState } from "../features/blogs/blogSlice";
import blogSvg from "../images/about1.png";
import blogSvg1 from "../images/about2.png";
import Blog from "./Blog";
import Spinner from "./Spinner";

const Blogs = () => {
  const { blogs, isLoading, isError, message } = useSelector(
    (state) => state.blog
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }

    if (isError) {
      console.log(message);
    }
  

    dispatch(getBlogs());

    return async () => {
      await dispatch(resetState());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Container fluid className="bg-light  p-3 min-height-20">
        <Container fluid>
          <Row>
            <Col md={3} className="d-none d-md-block">
              <img src={blogSvg} alt="svg1" className="w-100" />
            </Col>
            <Col
              md={6}
              className="m-auto p-3 overflow-scroll"
              style={{ height: "calc(100vh - 100px)" }}
            >
              {blogs.length > 0 ? (
                blogs?.map((blog) => <Blog key={blog._id} blog={blog} />)
              ) : (
                <div className="alert alert-warning text-center" role="alert">
                  <h4 className="alert-heading">No Blogs Available</h4>
                </div>
              )}
            </Col>
            <Col
              md={3}
              className="d-none d-md-flex align-items-end"
              style={{ minHeight: "80vh" }}
            >
              <img src={blogSvg1} alt="svg2" className="w-100" />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Blogs;
