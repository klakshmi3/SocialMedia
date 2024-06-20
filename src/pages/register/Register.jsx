import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setErr(null); // Clear previous error messages
    setSuccess(null); // Clear previous success messages

    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
      setSuccess("Registration successful! Please log in.");
    } catch (err) {
      if (err.response && err.response.data) {
        setErr(err.response.data.message);
      } else {
        setErr("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Bird</h1>
          <p>
            "You can never go wrong by investing in communities and the human beings within them."
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              required
            />
            {err && <p className="error">{err}</p>}
            {success && <p className="success">{success}</p>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
