import Navbar from "../components/Navbar";

const Fees = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-slate-900">

      {/* NAVBAR */}
      <Navbar />

      {/* ================= FEES COMPARISON ================= */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">

          <div className="text-center">
            <h1 className="text-4xl font-extrabold">Fees/Scholarship</h1>
            <p className="mt-2 text-slate-500">
              Compare fees and explore scholarship support for engineering colleges in Gujarat
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

      {/* ================= SCHOLARSHIP ================= */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold">Scholarship Information</h2>
            <p className="mt-2 text-slate-500">Useful scholarship options for Gujarat engineering students</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            <article className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-blue-900">MYSY Scholarship</h3>
              <p className="mt-2 text-sm text-slate-600">
                Mukhyamantri Yuva Swavalamban Yojana (MYSY) is a Gujarat Government scholarship
                scheme that supports tuition fees for eligible students pursuing higher education.
              </p>
              <p className="mt-3 text-sm">
                Official Website:{" "}
                <a
                  href="https://mysy.guj.nic.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-700 underline"
                >
                  https://mysy.gujarat.gov.in/
                </a>
              </p>

              <div className="mt-5">
                <p className="font-semibold text-slate-900">Eligibility Criteria (Typical)</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                  <li>Student must be a resident of Gujarat.</li>
                  <li>Admission in recognized diploma/degree program.</li>
                  <li>Minimum required marks in qualifying exam as per current MYSY rules.</li>
                  <li>Family annual income should be within the prescribed limit.</li>
                </ul>
              </div>

              <div className="mt-5">
                <p className="font-semibold text-slate-900">Required Documents</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                  <li>Aadhaar Card.</li>
                  <li>Recent passport-size photograph.</li>
                  <li>12th/Diploma marksheet and admission proof.</li>
                  <li>Income Certificate.</li>
                  <li>Domicile Certificate (if asked).</li>
                  <li>Bank passbook (student account details).</li>
                  <li>Caste certificate (for reserved categories, if applicable).</li>
                </ul>
              </div>
            </article>

            <article className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-emerald-900">Digital Gujarat Scholarship Portal</h3>
              <p className="mt-2 text-sm text-slate-600">
                Digital Gujarat is the state scholarship portal where students can apply online for
                multiple post-matric and higher education scholarships.
              </p>
              <p className="mt-3 text-sm">
                Official Website:{" "}
                <a
                  href="https://www.digitalgujarat.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-emerald-700 underline"
                >
                  https://www.digitalgujarat.gov.in/
                </a>
              </p>

              <div className="mt-5">
                <p className="font-semibold text-slate-900">Eligibility Criteria (Typical)</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                  <li>Student should be from Gujarat and studying in a recognized institute.</li>
                  <li>Category and income limits depend on selected scholarship scheme.</li>
                  <li>Valid enrollment and academic progression are required.</li>
                  <li>Student should have an active bank account linked with Aadhaar.</li>
                </ul>
              </div>

              <div className="mt-5">
                <p className="font-semibold text-slate-900">Required Documents</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                  <li>Aadhaar Card and mobile number for OTP verification.</li>
                  <li>Income Certificate and caste certificate (as per scheme).</li>
                  <li>Previous exam marksheet and current fee receipt.</li>
                  <li>Bonafide certificate/admission letter from institute.</li>
                  <li>Bank passbook copy.</li>
                  <li>Residence proof and other scheme-specific documents.</li>
                </ul>
              </div>
            </article>

          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            Eligibility rules and document lists may change every year. Please verify the latest guidelines on the official portals before applying.
          </div>

        </div>
      </section>

    </div>
  );
};

export default Fees;