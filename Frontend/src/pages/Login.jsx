import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/auth";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showMessage = (msg, type) => {
    setMessage(msg);
    setType(type);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    // ✅ VALIDATION
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
      showMessage("Invalid email", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters", "error");
      return;
    }

    showMessage("Logging in...", "info");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ STORE DATA
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        showMessage("Login successful!", "success");

        setTimeout(() => {
          navigate("/");
        }, 1000);

      } else {
        showMessage(data.message || "Login failed", "error");
      }

    } catch (err) {
      showMessage("Backend not running!", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {message && (
          <div className="mb-3 text-sm text-center text-red-500">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            onChange={handleChange}
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="border p-2 w-full mb-3"
            onChange={handleChange}
          />

          <button className="bg-blue-600 text-white w-full p-2 rounded">
            Login
          </button>
        </form>

        <p className="text-sm mt-3 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;