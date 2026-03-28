import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Predictor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rank: "",
    category: "",
    branch: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { rank, category, branch } = formData;

  if (!rank || !category || !branch) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rank: Number(rank),
        category: category.toUpperCase(),
        branch:
          branch === "Computer Engineering"
            ? "CSE"
            : branch === "Information Technology"
            ? "IT"
            : branch === "Mechanical Engineering"
            ? "Mechanical"
            : branch === "Electrical Engineering"
            ? "Electrical"
            : "Civil",
      }),
    });

    const data = await response.json();

    // 🔥 Save result
    localStorage.setItem("predictionResult", JSON.stringify(data));

    navigate("/results");
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};


  return (
    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <section className="flex flex-col items-center justify-center p-6">

        <h1 className="text-3xl font-bold mb-8 text-center">
          College Predictor
        </h1>

        {/* HOW IT WORKS */}
        <div className="border mb-6 border-blue-200 bg-blue-50 rounded-xl p-6 max-w-3xl">
          <p className="font-medium mb-2 text-blue-900">How it Works</p>
          <ul className="text-sm text-blue-900 space-y-1">
            <li>1. Based on previous year cutoff data</li>
            <li>2. Shows High / Medium / Low chances</li>
            <li>3. Filter by city, type, hostel</li>
          </ul>
        </div>

        {/* FORM */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Enter Your Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Rank */}
            <div>
              <label className="font-semibold">ACPC Rank</label>
              <input
                name="rank"
                type="number"
                placeholder="e.g. 5000"
                className="w-full bg-gray-100 border rounded-lg px-4 py-3 mt-2"
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div>
              <label className="font-semibold">Category</label>
              <select
                name="category"
                className="w-full bg-gray-100 border rounded-lg px-4 py-3 mt-2"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>OPEN</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
                <option>EWS</option>
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="font-semibold">Branch</label>
              <select
                name="branch"
                className="w-full bg-gray-100 border rounded-lg px-4 py-3 mt-2"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Computer Engineering</option>
                <option>Information Technology</option>
                <option>Mechanical Engineering</option>
                <option>Electrical Engineering</option>
                <option>Civil Engineering</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl text-lg"
            >
              Show My Colleges
            </button>

          </form>
        </div>

      </section>
    </div>
  );
};

export default Predictor;