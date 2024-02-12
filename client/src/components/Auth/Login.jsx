import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <form>
        <p>Please login to your account</p>

        <div className="form-outline mb-3">
          <input
            type="text"
            id="form2Example11"
            className="form-control"
            placeholder="Username or email address"
          />
          <label className="form-label" htmlFor="form2Example11">
            Username
          </label>
        </div>

        <div className="form-outline mb-3">
          <input type="password" id="form2Example22" className="form-control" />
          <label className="form-label" htmlFor="form2Example22">
            Password
          </label>
        </div>

        <div className="text-center d-flex align-items-center mb-5 gap-2">
          <button
            className="btn btn-block fa-lg gradient-custom-2"
            type="button"
          >
            Log in
          </button>
          <a className="text-muted" href="#!">
            Forgot password?
          </a>
        </div>

        <div className="d-flex align-items-center justify-content-center pb-4">
          <p className="mb-0 me-2">Don&apos;t have an account?</p>
          <button type="button" className="btn btn-outline-danger" onClick={() => navigate("/register")}>
            Create new
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
