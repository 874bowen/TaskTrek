import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      });
  };

  return (
    <Layout>
      <form>
        <p>Please login to your account</p>

        <div className="form-outline mb-3">
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="form-control"
            placeholder="Enter email address"
          />
          <label className="form-label" htmlFor="email">
            Email
          </label>
        </div>

        <div className="form-outline mb-3">
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={formData.username}
            className="form-control"
            placeholder="Username"
          />
          <label className="form-label" htmlFor="username">
            Username
          </label>
        </div>

        <div className="form-outline mb-3">
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="form-control"
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
        </div>

        <div className="form-outline mb-3">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            className="form-control"
          />
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
        </div>

        <div className="text-center d-flex align-items-center mb-5 gap-2">
          <button
            className="btn btn-block fa-lg gradient-custom-2"
            type="button"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>

        <div className="d-flex align-items-center justify-content-center pb-4">
          <p className="mb-0 me-2">Already have an account?</p>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </form>

      <ToastContainer />
    </Layout>
  );
};

export default Register;
