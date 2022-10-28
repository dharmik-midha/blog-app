import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BlogEditor from "./components/AddBlog";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import SingleBlog from "./components/SingleBlog";
import { store } from "./features/store";
import "react-toastify/dist/ReactToastify.css";
import AddBlog from "./components/AddBlog";
import EditBlog from "./components/EditBlog";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/create" element={<AddBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </Provider>
  );
};

export default App;
