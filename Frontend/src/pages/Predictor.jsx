import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";

const Predictor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const [formData, setFormData] = useState({
    rank: "",
    category: "",
    branch: "",
  });

  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rank: Number(rank),
          category,
          branch, // ✅ already correct value
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error");
      }

      // ✅ Save result
      localStorage.setItem("predictionResult", JSON.stringify(data));

      navigate("/results");

    } catch (error) {
      console.error(error);
      alert("Server error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <section className="flex flex-col items-center justify-center p-6 py-12">

        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800" data-aos="fade-up">
          College Predictor
        </h1>

        {/* HOW IT WORKS */}
        <div className="border mb-6 border-blue-200 bg-blue-50 rounded-xl p-6 max-w-3xl shadow-lg" data-aos="fade-up" data-aos-delay="200">
          <p className="font-medium mb-2 text-blue-900">How it Works</p>
          <ul className="text-sm text-blue-900 space-y-1">
            <li>1. Based on previous year cutoff data</li>
            <li>2. Shows High / Medium / Low chances</li>
            <li>3. Filter by city, type, hostel</li>
          </ul>
        </div>

        {/* FORM */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="400">

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
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div>
              <label className="font-semibold">Category</label>
              <select
                name="category"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="OPEN">OPEN</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="font-semibold">Branch</label>
              <select
                name="branch"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="CSE">Computer Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="Mechanical">Mechanical Engineering</option>
                <option value="Electrical">Electrical Engineering</option>
                <option value="Civil">Civil Engineering</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {loading ? "Predicting..." : "🚀 Show My Colleges"}
            </button>

          </form>
        </div>

      </section>
    </div>
  );
};

export default Predictor;