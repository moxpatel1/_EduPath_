import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Results = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("predictionResult");
    if (storedResult) {
      setResults(JSON.parse(storedResult));
      setLoading(false);
    } else {
      setError("No prediction data found. Please try predicting again.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-red-600 text-xl">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Your College Predictions
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Safe Colleges */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Safe Colleges (High Chance)
            </h2>
            {results.safe.length > 0 ? (
              <ul className="space-y-2">
                {results.safe.map((college, index) => (
                  <li key={index} className="border-b pb-2">
                    <h3 className="font-medium">{college.name}</h3>
                    <p className="text-sm text-gray-600">
                      {college.city} - {college.branch}
                    </p>
                    <p className="text-sm text-green-600">Chance: {college.chance}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No colleges in this category</p>
            )}
          </div>

          {/* Target Colleges */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
              Target Colleges (Medium Chance)
            </h2>
            {results.target.length > 0 ? (
              <ul className="space-y-2">
                {results.target.map((college, index) => (
                  <li key={index} className="border-b pb-2">
                    <h3 className="font-medium">{college.name}</h3>
                    <p className="text-sm text-gray-600">
                      {college.city} - {college.branch}
                    </p>
                    <p className="text-sm text-yellow-600">Chance: {college.chance}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No colleges in this category</p>
            )}
          </div>

          {/* Dream Colleges */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Dream Colleges (Low Chance)
            </h2>
            {results.dream.length > 0 ? (
              <ul className="space-y-2">
                {results.dream.map((college, index) => (
                  <li key={index} className="border-b pb-2">
                    <h3 className="font-medium">{college.name}</h3>
                    <p className="text-sm text-gray-600">
                      {college.city} - {college.branch}
                    </p>
                    <p className="text-sm text-red-600">Chance: {college.chance}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No colleges in this category</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;