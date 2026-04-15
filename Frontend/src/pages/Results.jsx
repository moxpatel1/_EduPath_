import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";

const normalizeInstituteType = (value) => {
  const normalized = String(value || "").trim().toLowerCase();

  if (normalized.includes("self")) {
    return "Self-Finance";
  }

  if (
    normalized.includes("government")
    || normalized.includes("govt")
    || normalized.includes("gia")
    || normalized.includes("grant in aid")
    || normalized.includes("auto")
  ) {
    return "Government";
  }

  return value || "-";
};

const getChanceBadge = (chance) => {
  if (chance === "High") {
    return "bg-emerald-100 text-emerald-700";
  }
  if (chance === "Medium") {
    return "bg-amber-100 text-amber-700";
  }
  return "bg-rose-100 text-rose-700";
};

const showValue = (value) => (value === null || value === undefined || value === "" ? "-" : value);

const Results = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collegeTypeFilter, setCollegeTypeFilter] = useState("all");

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

  const tableRows = useMemo(() => {
    if (!results) {
      return [];
    }

    return [...(results.safe || []), ...(results.target || []), ...(results.dream || [])]
      .map((college) => ({
        ...college,
        instituteTypeLabel: normalizeInstituteType(college.instituteType),
      }))
      .sort((left, right) => Number(left.cutoffRank || 0) - Number(right.cutoffRank || 0));
  }, [results]);

  const filteredRows = useMemo(() => {
    if (collegeTypeFilter === "all") {
      return tableRows;
    }

    return tableRows.filter((college) => {
      if (collegeTypeFilter === "self-finance") {
        return college.instituteTypeLabel === "Self-Finance";
      }
      if (collegeTypeFilter === "government") {
        return college.instituteTypeLabel === "Government";
      }
      return true;
    });
  }, [tableRows, collegeTypeFilter]);

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

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <p className="text-gray-600 text-sm md:text-base">
              Showing previous year predictions in table format
            </p>

            <div className="flex items-center gap-3">
              <label htmlFor="collegeType" className="text-sm font-medium text-gray-700">
                College Type
              </label>
              <select
                id="collegeType"
                value={collegeTypeFilter}
                onChange={(e) => setCollegeTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="self-finance">Self-Finance</option>
                <option value="government">Government</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-100 text-gray-700">
                <tr>
                  <th className="px-3 py-3 font-semibold">College</th>
                  <th className="px-3 py-3 font-semibold">Branch</th>
                  <th className="px-3 py-3 font-semibold">Alloted Cat</th>
                  <th className="px-3 py-3 font-semibold">Quota</th>
                  <th className="px-3 py-3 font-semibold">Institute Type</th>
                  <th className="px-3 py-3 font-semibold">Expected Cutoff Rank</th>
                  <th className="px-3 py-3 font-semibold">Last Rank</th>
                  <th className="px-3 py-3 font-semibold">Chance</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((college) => (
                    <tr key={college._id || `${college.name}-${college.branch}-${college.category}-${college.cutoffRank}`} className="border-t border-gray-100 even:bg-slate-50">
                      <td className="px-3 py-3 text-gray-800 min-w-[300px]">{showValue(college.name)}</td>
                      <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{showValue(college.branch)}</td>
                      <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{showValue(college.category)}</td>
                      <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{showValue(college.quota)}</td>
                      <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{showValue(college.instituteTypeLabel)}</td>
                      <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{showValue(college.expectedCutoffRank)}</td>
                      <td className="px-3 py-3 text-gray-700 whitespace-nowrap">{showValue(college.lastRank || college.cutoffRank)}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getChanceBadge(college.chance)}`}>
                          {college.chance}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                      No colleges found for selected college type filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;