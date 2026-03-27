import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api/auth";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
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

    const { name, email, password, passwordConfirm } = form;

    // ✅ VALIDATION
    if (name.trim().length < 3) {
      showMessage("Name must be at least 3 characters long.", "error");
      return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters long.", "error");
      return;
    }

    if (password !== passwordConfirm) {
      showMessage("Passwords do not match.", "error");
      return;
    }

    showMessage("Creating your account...", "info");

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password   // ✅ ONLY THIS (no passwordConfirm)
        })
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Account created successfully! Redirecting...", "success");

        // OPTIONAL: store user (if backend sends it)
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } else {
        showMessage(data.message || "Signup failed. Try again.", "error");
      }

    } catch (error) {
      showMessage(
        "Error: Cannot connect to backend (http://localhost:5000)",
        "error"
      );
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/media/images/Copilot_20260201_113525.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      {/* HEADING */}
      <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
        Welcome to EduPath
      </h1>

      {/* BOX */}
      <div className="bg-white shadow-md w-96 rounded-lg">
        <div className="p-6">

          <h3 className="text-2xl font-bold text-center mb-6">Signup</h3>

          {/* MESSAGE */}
          {message && (
            <div
              className={`mb-4 p-3 rounded ${
                type === "success"
                  ? "bg-green-100 text-green-800"
                  : type === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {message}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              id="name"
              placeholder="Full Name"
              className="bg-white rounded-lg border p-3 w-full mb-4"
              required
              onChange={handleChange}
            />

            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="bg-white rounded-lg border p-3 mb-4 w-full"
              required
              onChange={handleChange}
            />

            <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-white rounded-lg border p-3 mb-4 w-full"
              minLength="6"
              required
              onChange={handleChange}
            />

            <input
              type="password"
              id="passwordConfirm"
              placeholder="Confirm Password"
              className="bg-white rounded-lg border p-3 w-full mb-4"
              minLength="6"
              required
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 mb-4"
            >
              Create Account
            </button>

          </form>

          <h3 className="text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </h3>

        </div>
      </div>

    </div>
  );
};

export default Signup;