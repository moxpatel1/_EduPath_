import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";

const SHORTLIST_STORAGE_KEY = "shortlistedColleges";

const readShortlistFromStorage = () => {
  try {
    const raw = localStorage.getItem(SHORTLIST_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeShortlistToStorage = (items) => {
  localStorage.setItem(SHORTLIST_STORAGE_KEY, JSON.stringify(items));
};

const showValue = (value) => (value === null || value === undefined || value === "" ? "-" : value);

const Shortlist = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readShortlistFromStorage());
  }, []);

  const removeCollege = (shortlistId) => {
    const updated = items.filter((item) => item.shortlistId !== shortlistId);
    setItems(updated);
    writeShortlistToStorage(updated);
  };

  const clearAll = () => {
    setItems([]);
    writeShortlistToStorage([]);
  };

  const sortedItems = useMemo(
    () => [...items].sort((left, right) => new Date(right.savedAt || 0) - new Date(left.savedAt || 0)),
    [items],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Your Shortlist</h1>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="px-4 py-2 rounded-lg bg-red-50 text-red-700 border border-red-300 font-semibold"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          {sortedItems.length === 0 ? (
            <p className="text-gray-600">No shortlisted colleges yet. Save colleges from the Results page.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-slate-100 text-gray-700">
                  <tr>
                    <th className="px-3 py-3 font-semibold">College</th>
                    <th className="px-3 py-3 font-semibold">Branch</th>
                    <th className="px-3 py-3 font-semibold">Category</th>
                    <th className="px-3 py-3 font-semibold">City</th>
                    <th className="px-3 py-3 font-semibold">Institute Type</th>
                    <th className="px-3 py-3 font-semibold">Expected Cutoff Rank</th>
                    <th className="px-3 py-3 font-semibold">Chance</th>
                    <th className="px-3 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedItems.map((college) => (
                    <tr key={college.shortlistId} className="border-t border-gray-100 even:bg-slate-50">
                      <td className="px-3 py-3 text-gray-800 min-w-[260px]">{showValue(college.name)}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{showValue(college.branch)}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{showValue(college.category)}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{showValue(college.city)}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{showValue(college.instituteTypeLabel || college.instituteType)}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{showValue(college.expectedCutoffRank)}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{showValue(college.chance)}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => removeCollege(college.shortlistId)}
                          className="px-3 py-1.5 rounded-lg bg-white text-red-700 border border-red-300 text-xs font-semibold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shortlist;
