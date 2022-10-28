import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteBlog,
  getBlog,
  likeBlog,
  resetState,
} from "../features/blogs/blogSlice";
import NotFound from "./NotFound";
import Spinner from "./Spinner";
import { formatDate } from "./utils";

const SingleBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user,id, email } = useSelector((state) => state.auth);
  const { blog, isError, message, isLoading } = useSelector(
    (state) => state.blog
  );

  const params = useParams();
  //Use Effects
  useEffect(() => {
    dispatch(getBlog(params.id));
  }, [params.id, dispatch]);

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      return;
    }
  }, [isError, message]);
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
    dispatch(resetState());
    navigate("/blogs");
  };

  if (isLoading) {
    return <Spinner />;
  }
  console.log(blog);
  return (
    <Container fluid>
      <Row>
        <Col className="px-3 py-1">
          {" "}
          <Link className="text-decoration-none fw-bold" to="/blogs">
            Back
          </Link>
        </Col>
      </Row>
      {Object.keys(blog).length !== 0 ? (
        <Row className="my-2">
          <Col md={10} lg={8} className="m-auto py-4 ">
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <div className="d-flex ">
                      <i className="fas  fa-user-circle d-inline fs-10 me-2"></i>
                      <div className="w-100">
                        <Row className="">
                          <Col xs={7} md={9} className="">
                            <span className="fs-6  fw-bold">
                              {blog?.createdBy?.name}
                            </span>
                            <br />
                            <small className="cursive">
                              {formatDate(blog?.createdAt)} .{" "}
                              <span className="text-primary text-capitalize">
                                {blog?.category}
                              </span>
                            </small>
                          </Col>
                          <Col
                            xs={5}
                            md={3}
                            lg={2}
                            className=" d-flex m-auto flex-wrap justify-content-between align-items-center   text-center"
                          >
                            <i className="fa-brands text-info fa-twitter fs-5" />
                            <i className="fa-brands text-primary fa-facebook-square fs-5" />
                            <i className="fa-brands text-blue fa-linkedin fs-5" />
                            <i className="fa-regular fa-bookmark fs-5" />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="flex-column-reverse flex-sm-row">
                  <Col className=" py-2">
                    <p className="fs-4 text-responsive lh-sm fw-bold d-none d-md-block">
                      {blog?.title}
                    </p>
                    <p className="fs-6 text-responsive lh-sm fw-bold d-md-none">
                      {blog?.title}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col
                    md={4}
                    className="mx-auto  d-flex align-items-center justify-content-center"
                  >
                    <img
                      src={blog?.img}
                      className="rounded  shadow w-100 p-2"
                      alt="1"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div
                      className="py-1 text-justify fs-5 lh-sm text-secondary "
                      dangerouslySetInnerHTML={{
                        __html: blog?.content,
                      }}
                    ></div>
                    <div className="pt-4 d-flex">
                      <span className="badge bg-transparent text-danger">
                        <i
                          className={
                            blog.likes.findIndex((e) => e === id) > -1
                              ? "fas fa-heart fs-5"
                              : "far fa-heart fs-5"
                          }
                          onClick={() => {
                            dispatch(likeBlog(blog));
                          }}
                        />
                        <small className="ms-1 fs-6">
                          {blog?.likes.length}
                        </small>
                      </span>
                      {blog?.createdBy?.email === email && (
                        <span className="ms-auto">
                          <div
                            className="btn btn-outline-primary btn-sm my-2 me-2"
                            onClick={() => {
                              navigate(`/edit/${blog?._id}`);
                            }}
                          >
                            <i className="fa-light fs-6  fa-edit" />
                          </div>
                          <div
                            className="btn btn-outline-danger btn-sm my-2"
                            onClick={() => {
                              handleDelete(blog?._id);
                            }}
                          >
                            <i className="fa-light fs-6  fa-trash" />
                          </div>
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <NotFound />
      )}
    </Container>
  );
};

export default SingleBlog;
