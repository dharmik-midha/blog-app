import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteBlog, likeBlog, resetState } from "../features/blogs/blogSlice";
import { formatDate } from "./utils";

const Blog = (props) => {
  const { blog } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, id, email } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [user, navigate]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
    dispatch(resetState());
  };

  return (
    <Row className="my-2">
      <Col className="m-auto">
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <div className="d-flex align-items-center ">
                  <i className="fas  fa-user-circle d-inline fs-5 me-2"></i>
                  <span className="fs-6  fw-bold">{blog?.createdBy?.name}</span>
                </div>
              </Col>
            </Row>
            <Row className="flex-column-reverse flex-sm-row">
              <Col md={8} className=" py-2">
                <p className="fs-4 text-responsive lh-sm fw-bold d-none d-md-block">
                  {blog?.title}
                </p>
                <p className="fs-6 text-responsive lh-sm fw-bold d-md-none">
                  {blog?.title}
                </p>
                <div
                  className="py-2 d-none d-md-block fs-5 lh-sm text-secondary limitText"
                  dangerouslySetInnerHTML={{ __html: blog?.content }}
                ></div>
                <div className="pt-4">
                  <small className="cursive">
                    {" "}
                    {formatDate(blog?.createdAt)}.
                    <span className="text-primary mx-1 text-capitalize">
                      {blog?.category}
                    </span>
                    .{" "}
                    <Link
                      to={`/blogs/${blog?._id}`}
                      className="text-decoration-none btn badge bg-primary"
                    >
                      Read More
                    </Link>
                  </small>
                </div>
                <div className="d-flex align-items-center cursor-pointer">
                  <span
                    className="badge bg-transparent text-danger"
                    onClick={() => {
                      console.log(blog);
                      dispatch(likeBlog(blog));
                    }}
                  >
                    <i
                      className={
                        blog.likes.findIndex((e) => e === id) > -1
                          ? "fas fa-heart fs-5"
                          : "far fa-heart fs-5"
                      }
                    />
                    <small className="ms-1 fs-6">{blog?.likes?.length}</small>
                  </span>
                  {blog?.createdBy?.email === email && (
                    <div className="ms-auto">
                      <div
                        className="btn btn-outline-primary btn-sm my-2 me-2"
                        onClick={() => {
                          navigate(`/edit/${blog?._id}`);
                        }}
                      >
                        <i className="fa-light   fs-6  fa-edit" />
                      </div>
                      <div
                        className="btn btn-outline-danger btn-sm my-2"
                        onClick={() => {
                          handleDelete(blog?._id);
                        }}
                      >
                        <i className="fa-light fs-6  fa-trash" />
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Col md={4}>
                <img
                  src={blog?.img}
                  className="rounded  shadow w-100 p-2 h-75"
                  alt="1"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Blog;
