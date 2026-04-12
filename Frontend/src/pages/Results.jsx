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

  const renderSection = (title, colleges, color, bgGradient, borderColor) => {
    if (!colleges.length) return null;

    return (
      <div className="mb-10" data-aos="fade-up">
        <h2 className={`text-3xl font-bold mb-6 ${color} flex items-center`}>
          <span className="mr-3">{title.split(' ')[0]}</span>
          <span>{title.split(' ').slice(1).join(' ')}</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${bgGradient} p-6 rounded-3xl shadow-xl border-2 ${borderColor} hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-lg">🏛️</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${color.replace('text-', 'bg-').replace('-600', '-100')} ${color.replace('-600', '-700')}`}>
                  {college.chance || 'Good'}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {college.name}
              </h3>

              <div className="space-y-2 text-gray-700">
                <p className="flex items-center">
                  <span className="text-blue-500 mr-2">🎓</span>
                  <span className="font-medium">Branch:</span>
                  <span className="ml-2">{college.branch}</span>
                </p>
                <p className="flex items-center">
                  <span className="text-green-500 mr-2">📊</span>
                  <span className="font-medium">Cutoff Rank:</span>
                  <span className="ml-2 font-bold text-green-600">{college.closingRank}</span>
                </p>
                {college.fees && (
                  <p className="flex items-center">
                    <span className="text-purple-500 mr-2">💰</span>
                    <span className="font-medium">Fees:</span>
                    <span className="ml-2 font-bold text-purple-600">₹{college.fees}</span>
                  </p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>📍 {college.city || 'Gujarat'}</span>
                  <span>🏫 {college.type || 'Engineering'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <Navbar />

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <section className="relative p-6 max-w-6xl mx-auto min-h-[calc(100vh-80px)]">

        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white text-3xl">📊</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Predicted Colleges
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your rank and preferences, here are the colleges where you have the best chances
          </p>
        </div>

        {/* Results */}
        <div className="space-y-8" data-aos="fade-up">

          {renderSection("🟢 Safe Colleges", data.safe, "text-green-600", "from-green-50 to-green-100", "border-green-200")}
          {renderSection("🟡 Target Colleges", data.target, "text-yellow-600", "from-yellow-50 to-yellow-100", "border-yellow-200")}
          {renderSection("🔴 Dream Colleges", data.dream, "text-red-600", "from-red-50 to-red-100", "border-red-200")}

          {!data.safe.length && !data.target.length && !data.dream.length && (
            <div className="text-center py-16" data-aos="fade-in">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl">❓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No colleges found</h3>
              <p className="text-xl text-gray-600 mb-8">
                Try different inputs or contact us for personalized guidance
              </p>
              <button
                onClick={() => navigate("/predict")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
              >
                Try Again
              </button>
            </div>
          )}

        </div>

        {/* Action Buttons */}
        {(data.safe.length || data.target.length || data.dream.length) && (
          <div className="mt-12 text-center" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/predict")}
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-4 px-8 rounded-2xl hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                🔄 Try Different Inputs
              </button>
              <button
                onClick={() => navigate("/admission")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                📚 Admission Guide
              </button>
            </div>
          </div>
        )}

      </section>
    </div>
  );
};

export default Results;