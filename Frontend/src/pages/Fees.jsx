import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Fees = () => {
  return (
    <div className="bg-gray-50 text-slate-900">

      {/* NAVBAR */}
      <Navbar />

      {/* ================= FEES COMPARISON ================= */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">

          <div className="text-center">
            <h1 className="text-4xl font-extrabold">Fees Comparison</h1>
            <p className="mt-2 text-slate-500">
              Compare fees across government and private engineering colleges in Gujarat
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* GOV */}
            <div className="rounded-2xl border border-blue-200 bg-white shadow-sm overflow-hidden">
              <div className="bg-blue-50 px-6 py-5">
                <h2 className="text-lg font-bold text-blue-900">Government Colleges</h2>
                <p className="text-sm text-slate-500">Lower fees, high ROI</p>
              </div>

              <div className="px-6 py-6 space-y-5">

                <div className="rounded-xl bg-blue-50 border border-blue-100 p-5">
                  <p className="text-sm text-slate-600">Average Annual Fees</p>
                  <p className="mt-2 text-4xl font-extrabold text-blue-700">₹8000-10000</p>
                  <p className="text-xs text-slate-500">Per year (Day Scholar)</p>
                </div>

                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-5">
                  <p className="text-sm text-slate-600">4-Year Total Cost</p>
                  <p className="mt-2 text-3xl font-extrabold text-emerald-600">₹40000-50000</p>
                </div>

                <div>
                  <p className="text-sm font-semibold">Hostel + Mess (Annual)</p>
                  <p className="mt-2 text-2xl font-extrabold">₹32,375</p>
                </div>

              </div>
            </div>

            {/* PRIVATE */}
            <div className="rounded-2xl border border-violet-200 bg-white shadow-sm overflow-hidden">
              <div className="bg-violet-50 px-6 py-5">
                <h2 className="text-lg font-bold text-violet-900">Private Colleges</h2>
                <p className="text-sm text-slate-500">Better facilities, higher fees</p>
              </div>

              <div className="px-6 py-6 space-y-5">

                <div className="rounded-xl bg-violet-50 border border-violet-100 p-5">
                  <p className="text-sm text-slate-600">Average Annual Fees</p>
                  <p className="mt-2 text-4xl font-extrabold text-violet-700">₹158,500</p>
                  <p className="text-xs text-slate-500">Per year (Day Scholar)</p>
                </div>

                <div className="rounded-xl bg-orange-50 border border-orange-100 p-5">
                  <p className="text-sm text-slate-600">4-Year Total Cost</p>
                  <p className="mt-2 text-3xl font-extrabold text-orange-600">₹634,000</p>
                </div>

                <div>
                  <p className="text-sm font-semibold">Hostel + Mess (Annual)</p>
                  <p className="mt-2 text-2xl font-extrabold">₹87,500</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= TABLE ================= */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">

            <h2 className="text-lg font-bold">College-wise Fee Structure</h2>
            <p className="mt-1 text-sm text-slate-500">
              Annual fees for all colleges (in ₹)
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-sm">

                <thead className="bg-slate-50 text-left text-slate-600">
                  <tr>
                    <th className="px-5 py-4">College</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Tuition</th>
                    <th className="px-5 py-4">Other</th>
                    <th className="px-5 py-4">Day Scholar</th>
                    <th className="px-5 py-4 text-right">With Hostel</th>
                  </tr>
                </thead>

                <tbody className="divide-y">

                  <tr>
                    <td className="px-5 py-5">LDCE</td>
                    <td className="px-5 py-5">Government</td>
                    <td className="px-5 py-5">₹45,000</td>
                    <td className="px-5 py-5">₹5,000</td>
                    <td className="px-5 py-5 font-semibold">₹50,000</td>
                    <td className="px-5 py-5 text-right font-semibold">₹82,000</td>
                  </tr>

                </tbody>

              </table>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SCHOLARSHIP ================= */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold">Scholarship Information</h2>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-semibold text-blue-900">Important Information</p>
            <ul className="mt-2 list-disc pl-5 text-sm">
              <li>Apply immediately</li>
              <li>Use Digital Gujarat portal</li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Fees;