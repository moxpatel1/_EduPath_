import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    safe: [],
    target: [],
    dream: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem("predictionResult");

    if (!stored) {
      navigate("/predict");
      return;
    }

    setData(JSON.parse(stored));
  }, []);

  const renderSection = (title, colleges, color) => {
    if (!colleges.length) return null;

    return (
      <div className="mb-10">
        <h2 className={`text-2xl font-bold mb-4 ${color}`}>
          {title}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {colleges.map((college, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-md border"
            >
              <h3 className="font-bold text-lg">
                {college.name}
              </h3>
              <p className="text-gray-600">
                Branch: {college.branch}
              </p>
              <p className="text-gray-500 text-sm">
                Closing Rank: {college.closingRank}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <section className="p-6 max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Your Predicted Colleges
        </h1>

        {renderSection("🟢 Safe Colleges", data.safe, "text-green-600")}
        {renderSection("🟡 Target Colleges", data.target, "text-yellow-600")}
        {renderSection("🔴 Dream Colleges", data.dream, "text-red-600")}

        {!data.safe.length && !data.target.length && !data.dream.length && (
          <p className="text-gray-600 text-lg">
            No colleges found. Try different inputs.
          </p>
        )}

        <button
          onClick={() => navigate("/predict")}
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
        >
          Try Again
        </button>

      </section>
    </div>
  );
};

export default Results;