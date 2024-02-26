import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/forget-password`,
        { email }
      );
      if (response.data.status === "success") {
        setSent(true);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirect after 3 seconds
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <p>
        Enter the email address associated with your account and we'll send you
        instructions on how to reset your password.
      </p>
      {!sent && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Reset Instructions
          </button>
        </form>
      )}
      {sent && (
        <p>
          Instructions to reset your password have been sent to your email
          address. Please check your inbox (and spam folder) and follow the
          instructions.
        </p>
      )}
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
