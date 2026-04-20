import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
const stats = [
  { value: "200k+", label: "Annual Applicants", icon: "🧑‍🎓", accent: "from-blue-500 to-cyan-500" },
  { value: "400+", label: "Participating Colleges", icon: "🏫", accent: "from-violet-500 to-fuchsia-500" },
  { value: "75k+", label: "Total Seats", icon: "🎯", accent: "from-emerald-500 to-teal-500" },
  { value: "3", label: "Counseling Rounds", icon: "🗓️", accent: "from-orange-500 to-amber-500" },
];

const processSteps = [
  {
    title: "JEE Main / GUJCET Examination",
    description: "Appear for JEE Main or GUJCET. Your rank and percentile become the base for ACPC merit.",
  },
  {
    title: "Registration on ACPC Portal",
    description: "Register with valid details and complete profile information on the official ACPC portal.",
  },
  {
    title: "Document Verification",
    description: "Upload and verify marksheets, certificates, and category documents before deadline.",
  },
  {
    title: "Choice Filling",
    description: "Fill college and branch preferences in the right priority order based on realistic options.",
  },
  {
    title: "Seat Allotment",
    description: "Seats are allotted by rank, category, and preference in multiple counseling rounds.",
  },
  {
    title: "Fee Payment and Reporting",
    description: "Pay fees and report to allotted institute with all original documents in time.",
  },
];

const dates = [
  { event: "JEE Main Session 1", date: "January 22-31, 2026", status: "Completed", tone: "bg-emerald-100 text-emerald-700" },
  { event: "JEE Main Session 2", date: "April 1-15, 2026", status: "Completed", tone: "bg-emerald-100 text-emerald-700" },
  { event: "ACPC Registration Opens", date: "May 20, 2026", status: "Scheduled", tone: "bg-slate-100 text-slate-700" },
  { event: "Choice Filling", date: "June 10-25, 2026", status: "Scheduled", tone: "bg-slate-100 text-slate-700" },
  { event: "Round 1 Allotment", date: "June 28, 2026", status: "Scheduled", tone: "bg-slate-100 text-slate-700" },
  { event: "Round 2 Allotment", date: "July 10, 2026", status: "Scheduled", tone: "bg-slate-100 text-slate-700" },
  { event: "Round 3 Allotment", date: "July 20, 2026", status: "Scheduled", tone: "bg-slate-100 text-slate-700" },
];

const mandatoryDocs = [
  "JEE Main / GUJCET Scorecard",
  "10th Marksheet and Certificate",
  "12th Marksheet and Certificate",
  "School Leaving Certificate",
  "Domicile Certificate",
  "Aadhaar Card",
  "Passport-size Photos",
  "Character Certificate",
];

const categoryDocs = [
  "Caste Certificate",
  "Caste Validity",
  "Non-Creamy Layer Certificate",
  "Income Certificate",
  "Disability Certificate",
  "Sports Certificate",
  "Defense Certificate",
  "Migration Certificate",
];

const tips = [
  {
    title: "Choice Filling Strategy",
    desc: "Fill more choices and keep dream, target, and safe options in the right order.",
    color: "from-emerald-50 to-emerald-100 border-emerald-200",
  },
  {
    title: "Never Miss Deadlines",
    desc: "Set reminders for registration, choice filling, payment, and reporting dates.",
    color: "from-blue-50 to-blue-100 border-blue-200",
  },
  {
    title: "Documents First",
    desc: "Keep all required certificates scanned and ready before portal steps begin.",
    color: "from-amber-50 to-amber-100 border-amber-200",
  },
  {
    title: "Seat Acceptance",
    desc: "After allotment, complete payment and college reporting within the allowed window.",
    color: "from-rose-50 to-rose-100 border-rose-200",
  },
];

const Admission = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
    <Navbar />

    <main className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
      <section className="relative overflow-hidden mt-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl">
        <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-violet-400/20 blur-3xl"></div>

        <div className="relative px-6 py-14 md:px-12 md:py-16 text-center">
          <p className="inline-flex items-center px-4 py-1 rounded-full bg-white/15 border border-white/25 text-sm tracking-wide mb-5">
            ACPC 2026 Roadmap
          </p>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            Complete Admission Guidance
          </h1>
          <p className="mt-4 text-blue-100 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Step-by-step support for Gujarat engineering admissions, from exam planning to seat confirmation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/predict"
              className="px-7 py-3 rounded-full bg-white text-blue-800 font-bold shadow-lg"
            >
              Start Prediction
            </Link>
            <a
              href="#timeline"
              className="px-7 py-3 rounded-full border border-white/40 bg-white/10 font-semibold"
            >
              View Timeline
            </a>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((item) => (
          <article key={item.label} className="rounded-2xl bg-white/90 border border-white shadow-lg p-5">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.accent} text-white flex items-center justify-center text-2xl`}>
              {item.icon}
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-slate-900">{item.value}</h2>
            <p className="text-sm md:text-base text-slate-600 mt-1">{item.label}</p>
          </article>
        ))}
      </section>

      <section id="timeline" className="mt-12">
        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Step-by-Step Process</h3>
        <p className="mt-2 text-slate-600">Follow this sequence to avoid missed steps and last-minute issues.</p>

        <div className="mt-8 space-y-5">
          {processSteps.map((step, index) => (
            <article key={step.title} className="relative rounded-2xl bg-white border border-slate-200 shadow-sm p-5 md:p-6">
              <div className="flex gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  {index !== processSteps.length - 1 && <div className="w-0.5 h-full bg-blue-200 mt-2"></div>}
                </div>

                <div className="flex-1 pb-1">
                  <h4 className="text-xl md:text-2xl font-bold text-slate-900">{step.title}</h4>
                  <p className="mt-2 text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Important Dates</h3>
        <p className="mt-2 text-slate-600">Tentative timeline for planning your admission tasks.</p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-5 py-4 text-left font-semibold">Event</th>
                <th className="px-5 py-4 text-left font-semibold">Date</th>
                <th className="px-5 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {dates.map((row) => (
                <tr key={row.event} className="border-t border-slate-100">
                  <td className="px-5 py-4 text-slate-800 font-medium">{row.event}</td>
                  <td className="px-5 py-4 text-slate-600">{row.date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.tone}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 grid md:grid-cols-2 gap-6">
        <article className="rounded-2xl bg-white border border-emerald-200 shadow-sm p-6">
          <h3 className="text-2xl font-bold text-emerald-800">Mandatory Documents</h3>
          <ul className="mt-4 space-y-2 text-slate-700">
            {mandatoryDocs.map((doc) => (
              <li key={doc}>✅ {doc}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl bg-white border border-amber-200 shadow-sm p-6">
          <h3 className="text-2xl font-bold text-amber-800">Category-Based Documents</h3>
          <ul className="mt-4 space-y-2 text-slate-700">
            {categoryDocs.map((doc) => (
              <li key={doc}>❗ {doc}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-12">
        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Tips and Guidelines</h3>
        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          {tips.map((tip) => (
            <article key={tip.title} className={`rounded-2xl border p-5 bg-gradient-to-br ${tip.color} shadow-sm`}>
              <h4 className="text-lg font-bold text-slate-900">{tip.title}</h4>
              <p className="mt-2 text-slate-700">{tip.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 text-white shadow-xl overflow-hidden relative">
        <div className="absolute -top-14 right-0 w-52 h-52 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-16 left-6 w-52 h-52 bg-cyan-300/20 rounded-full blur-2xl"></div>

        <div className="relative p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-4xl font-black">Ready to Predict Your Best Colleges?</h2>
          <p className="mt-3 text-blue-100 max-w-2xl mx-auto">
            Use your rank, branch, and category to explore realistic admission chances instantly.
          </p>
          <div className="mt-7">
            <Link
              to="/predict"
              className="inline-flex px-8 py-3 rounded-full bg-white text-blue-800 font-bold shadow-lg"
            >
              Go to Predictor
            </Link>
          </div>
        </div>
      </section>
    </main>
  </div>
);

export default Admission;