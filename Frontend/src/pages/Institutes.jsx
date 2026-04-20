import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { buildApiUrl } from "../config/api";

const Institutes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");
  const [branch, setBranch] = useState("");
  const [instituteType, setInstituteType] = useState("");
  const [sourceYear, setSourceYear] = useState("2025-26");

  const fetchInstitutes = useCallback(async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      const search = new URLSearchParams({
        sourceYear,
        limit: "200",
        ...params,
      });

      const response = await fetch(buildApiUrl(`/api/institutes?${search.toString()}`));
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Failed to fetch institutes");
      }

      setData(payload);
    } catch (err) {
      setError(err.message || "Failed to fetch institutes");
    } finally {
      setLoading(false);
    }
  }, [sourceYear]);

  useEffect(() => {
    fetchInstitutes();
  }, [fetchInstitutes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = {};
      if (query.trim()) {
        params.q = query.trim();
      }
      if (district) {
        params.district = district;
      }
      if (branch) {
        params.branch = branch;
      }
      if (instituteType) {
        params.instituteType = instituteType;
      }

      fetchInstitutes(params);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, district, branch, instituteType, sourceYear, fetchInstitutes]);

  const onApplyFilters = (e) => {
    e.preventDefault();

    const params = {};
    if (query.trim()) {
      params.q = query.trim();
    }
    if (district) {
      params.district = district;
    }
    if (branch) {
      params.branch = branch;
    }
    if (instituteType) {
      params.instituteType = instituteType;
    }

    fetchInstitutes(params);
  };

  const clearFilters = () => {
    setQuery("");
    setDistrict("");
    setBranch("");
    setInstituteType("");
    fetchInstitutes({});
  };

  const rows = useMemo(() => data?.institutes || [], [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <header className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white p-6 md:p-8 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-black">ACPC Institute Directory</h1>
          <p className="text-blue-100 mt-2">
            Browse official ACPC institute and branch data (Provisional List {sourceYear}).
          </p>
        </header>

        <section className="mt-6 bg-white rounded-2xl shadow-lg border border-slate-100 p-4 md:p-6">
          <form onSubmit={onApplyFilters} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search institute, address, email, or website"
              className="lg:col-span-2 border border-slate-300 rounded-lg px-3 py-2"
            />

            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2"
            >
              <option value="">All Districts</option>
              {(data?.filters?.districts || []).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2"
            >
              <option value="">All Branches</option>
              {(data?.filters?.branches || []).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <select
              value={instituteType}
              onChange={(e) => setInstituteType(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2"
            >
              <option value="">All Types</option>
              {(data?.filters?.instituteTypes || []).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <select
              value={sourceYear}
              onChange={(e) => setSourceYear(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2"
            >
              {(data?.sourceYears || ["2025-26"]).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold"
            >
              Apply
            </button>

            <button
              type="button"
              onClick={clearFilters}
              className="bg-white text-blue-700 border border-blue-300 rounded-lg px-4 py-2 font-semibold"
            >
              Clear
            </button>
          </form>
        </section>

        <section className="mt-6 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-slate-100 text-sm text-slate-600">
            Total Institutes/Branches: <span className="font-semibold text-slate-900">{data?.total || 0}</span>
            <span className="ml-3 text-slate-400">Filters update automatically while typing or selecting.</span>
          </div>

          {loading ? (
            <div className="p-8 text-slate-600">Loading institutes...</div>
          ) : error ? (
            <div className="p-8 text-red-600">{error}</div>
          ) : rows.length === 0 ? (
            <div className="p-8 text-slate-600">No institutes found for selected filters.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-900 text-white text-left">
                  <tr>
                    <th className="px-4 py-3">Institute</th>
                    <th className="px-4 py-3">Branch</th>
                    <th className="px-4 py-3">District</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Intake</th>
                    <th className="px-4 py-3">Fees</th>
                    <th className="px-4 py-3">Website</th>
                    <th className="px-4 py-3">Gov Seats</th>
                    <th className="px-4 py-3">Mgmt Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item) => (
                    <tr key={item._id} className="border-t border-slate-100 even:bg-slate-50">
                      <td className="px-4 py-3 min-w-[320px] text-slate-800 font-medium">
                        <div>{item.instituteName || "-"}</div>
                        {item.instituteDetails ? (
                          <div className="text-xs text-slate-500 mt-1 line-clamp-2 whitespace-pre-line">
                            {item.instituteDetails}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.rawBranchCell || item.branchName || "-"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.district || "-"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.instituteType || "-"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.intake ?? "-"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.annualFees ? `₹${item.annualFees}` : "-"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.websiteUrl ? (
                          <a
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 underline font-medium"
                          >
                            Visit
                          </a>
                        ) : "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{item?.seats?.government ?? "-"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item?.seats?.managementGujcet ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Institutes;
