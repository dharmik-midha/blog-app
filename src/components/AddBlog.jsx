import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import "../ckeditor.css";
import "../App.css";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  SplitButton,
} from "react-bootstrap";
import Spinner from "./Spinner";
import { useSelector, useDispatch } from "react-redux";
import blogSvg1 from "../images/cartoon.png";
import blogSvg from "../images/flight.png";
import { useNavigate } from "react-router-dom";
import { getCategories, reset } from "../features/categories/categorySlice";
import { uploadImage, reset as resetImage } from "../features/image/imageSlice";
import { createBlog, resetState } from "../features/blogs/blogSlice";
import { toast } from "react-toastify";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState({
    title: "",
    category: "",
    img: "",
    content: "",
  });

  const [err, setErr] = useState({});
  const category = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);
  const image = useSelector((state) => state.image);
  const { isLoading, isError, message } = useSelector((state) => state.blog);

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [user, navigate]);
  useEffect(() => {
    if (category.isError) {
      toast.error(category.message);
    }
  }, [category.isError, category.message]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
      dispatch(resetImage());
      dispatch(resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    toast.info(image.image.url);
    setEditorData({ ...editorData, img: image.image.url });
  }, [image.image]);

  const validateForm = (form) => {
    const errors = {};
    console.log(form?.img);
    if (form?.title?.trim() === "") errors.title = "Title Required";
    if (form?.content?.trim() === "") errors.content = "Content Required";
    if (form?.category?.trim() === "") errors.category = "Category Required";
    if (form?.img?.trim() === "" || form?.img === undefined)
      errors.img = "Image Required";

    return errors;
  };

  const handleChange = (e) => {
    setEditorData({ ...editorData, [e.target.name]: e.target.value });
    console.log(editorData);
  };

  const handleEditor = (event, editor) => {
    const data = editor.getData();
    setEditorData({ ...editorData, content: data });
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    dispatch(resetState());
    if (files.length === 1) {
      dispatch(uploadImage(files[0]));
      // .then((action) => {
      //   setEditorData({ ...editorData, img: action.payload.url });
      // });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(editorData);
    setErr(errors);
    console.log(errors);
    console.log(editorData);
    if (Object.keys(errors).length === 0) {
      console.log("submit");
      dispatch(createBlog(editorData))
        .then((res) => {
          navigate("/blogs");
        })
        .catch((err) => {
          toast.warn("something is fishy!");
        });
    }
  };

  if (isLoading) {
    console.log("iz loginf", isLoading);
    return <Spinner />;
  }
  return (
    <Container fluid className="bg-light p-3 min-height-20">
      <Container fluid className="editorBg">
        <Row>
          <Col
            md={3}
            className="d-none d-md-flex align-items-end"
            style={{ minHeight: "80vh" }}
          >
            <img src={blogSvg1} alt="svg2" className="w-100" />
          </Col>
          <Col
            md={6}
            className="m-auto p-3 overflow-scroll"
            style={{ height: "calc(100vh - 100px)" }}
          >
            <Card className="bg-form">
              <Card.Body>
                <div className="fs-4 text-center cursive">
                  Create Blog Here...
                </div>
                <Form className="p-3">
                  <Form.Group className="mb-2">
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control
                      className={err.title && "border-danger"}
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      onChange={handleChange}
                    />
                    <Row>
                      <small className="h-10  text-danger">{err?.title}</small>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-2 add-on-p has-feedback">
                    <Form.Label htmlFor="image">Image</Form.Label>
                    <Form.Control
                      className={err.img && "border-danger"}
                      type="file"
                      name="img"
                      placeholder="select image"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={handleImageUpload}
                    />
                    {image.isLoading && (
                      <i className="fa add-on fa-spinner text-info" />
                    )}
                    {image.isSuccess && (
                      <i className="fa add-on fa-check text-success" />
                    )}
                    {image.isError && (
                      <i className="fa add-on fa-exclamation-triangle text-danger" />
                    )}
                    <Row>
                      <small className="h-10  text-danger">{err?.img}</small>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label htmlFor="category">Category</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="category"
                      className={err.category && "border-danger"}
                      type="select"
                      onChange={handleChange}
                    >
                      <option>Select Category</option>
                      {category.categories &&
                        category.categories.map((e) => (
                          <option key={e._id} value={e.category}>
                            {e.category}
                          </option>
                        ))
                        }
                    </Form.Select>
                    <Row>
                      <small className="h-10  text-danger">
                        {err?.category}
                      </small>
                    </Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="body">Content</Form.Label>
                  </Form.Group>
                  <div
                    className={
                      err.content
                        ? "border rounded p-1 border-danger"
                        : "border rounded p-1"
                    }
                  >
                    <CKEditor
                      editor={ClassicEditor}
                      data="<p>Enter Your Content!</p>"
                      onChange={handleEditor}
                    />
                  </div>
                  <Row>
                    <small className="h-10  text-danger">{err?.content}</small>
                  </Row>
                  <Row className="p-2">
                    <Col className="text-center m-auto" xs={6}>
                      <button
                        type="submit"
                        className="btn bg-grey btn-lg btn-dark border-0 m-2"
                        onClick={handleSubmit}
                      >
                        Create
                      </button>
                    </Col>
                    <Col className="text-center m-auto" xs={6}>
                      <button className="btn bg-grey btn-lg btn-dark border-0 m-2">
                        Cancel
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="d-none d-md-block">
            <img src={blogSvg} alt="svg1" className="w-100" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AddBlog;
