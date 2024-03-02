import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, formData).then((res) => {
      console.log(res.data);
      if (res.data.status === "success") {
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    });
  }

  return (
    <Layout>
      <form>
        <p>Please login to your account</p>

        <div className="form-outline mb-3 flex flex-col">
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="input input-bordered w-full bg-[whitesmoke]"
            placeholder="email address"
          />
          <label className="form-label" htmlFor="email">
            Email
          </label>
        </div>

        <div className="form-outline mb-3 flex flex-col">
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="input input-bordered w-full bg-[whitesmoke]"
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
        </div>

        <div className="text-center d-flex align-items-center mb-5 gap-2">
          <button
            className="btn btn-block fa-lg gradient-custom-2"
            type="button"
            onClick={handleSubmit}
          >
            Log in
          </button>
          <a className="text-muted" href="#!">
            Forgot password?
          </a>
        </div>

        <div className="d-flex align-items-center justify-content-center pb-4">
          <p className="mb-0 me-2">Don&apos;t have an account?</p>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => navigate("/register")}
          >
            Create new
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
