import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/auth";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = form;

    // ✅ VALIDATION
    if (name.length < 3) {
      return setMessage("Name too short");
    }

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMessage(data.message || "Signup failed");
      }

    } catch (err) {
      setMessage("Backend not running!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

        {message && (
          <div className="mb-3 text-sm text-center text-red-500">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border p-2 w-full mb-3"
            onChange={handleChange}
          />

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

          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="border p-2 w-full mb-3"
            onChange={handleChange}
          />

          <button className="bg-green-600 text-white w-full p-2 rounded">
            Signup
          </button>
        </form>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;