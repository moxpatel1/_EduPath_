import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Admission = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 m-0 p-0">

      <Navbar />

      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 px-6 text-center rounded-lg shadow-lg max-w-full mx-auto" data-aos="fade-up">
        <h1 className="text-4xl font-bold mb-6">
          Complete Admission Guide
        </h1>
        <p className="text-lg">
          Your comprehensive guide to ACPC admission process for Engineerings colleges in Gujarat
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4" data-aos="fade-up" data-aos-delay="200">

        <div className="bg-white shadow-md text-center max-w-sm border-t-4 border-red-500 rounded-lg p-4 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="text-blue-500 text-4xl mb-4">👤</div>
          <h2 className="text-xl font-semibold mb-2">200k+</h2>
          <h3 className="text-gray-600">Annual Applicants</h3>
        </div>

        <div className="bg-white shadow-md text-center max-w-sm border-t-4 border-blue-500 rounded-lg p-4 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="text-green-500 text-4xl mb-4">🎓</div>
          <h2 className="text-xl font-semibold mb-2">400+</h2>
          <h3 className="text-gray-600">Colleges</h3>
        </div>

        <div className="bg-white shadow-md text-center max-w-sm border-t-4 border-green-500 rounded-lg p-4 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="text-purple-500 text-4xl mb-4">🏅</div>
          <h2 className="text-xl font-semibold mb-2">75k+</h2>
          <h3 className="text-gray-600">Total Seats</h3>
        </div>

        <div className="bg-white shadow-md text-center max-w-sm border-t-4 border-yellow-500 rounded-lg p-4 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="text-orange-500 text-4xl mb-4">⏰</div>
          <h2 className="text-xl font-semibold mb-2">3 Rounds</h2>
          <h3 className="text-gray-600">Counseling Rounds</h3>
        </div>

      </div>

      <div className="p-6 bg-white shadow-md rounded-lg" data-aos="fade-up" data-aos-delay="400">
        <h3 className="text-4xl flex justify-start font-bold">
          📚 Step-by-Step Admission Process
        </h3>
      </div>

      <div className="ml-20 mr-20 mb-4 mt-4" data-aos="fade-up" data-aos-delay="600">

        {/* STEP 1 */}
        <div className="max-w-full hover:shadow-xl border-l-4 border-blue-500 rounded-lg p-4 bg-white shadow">
          <div className="flex justify-between items-center gap-6">
            <div className="p-5">
              <h4 className="text-xl font-semibold">1</h4>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">JEE Main / GUJCET Examination</h3>
              <h5 className="text-gray-500">
                Appear for JEE Main (for Engineering) or GUJCET (Gujarat Common Entrance Test). Your percentile/rank will be the basis for admission.
              </h5>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="mt-4 max-w-full hover:shadow-xl border-l-4 border-blue-500 rounded-lg p-4 bg-white shadow">
          <div className="flex justify-between items-center gap-6">
            <div className="p-5">
              <h4 className="text-xl font-semibold">2</h4>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">Registration on ACPC Portal</h3>
              <h5 className="text-gray-500">
                Register on the official ACPC website with valid credentials. Fill in personal, academic, and contact details accurately.
              </h5>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="mt-4 max-w-full hover:shadow-xl border-l-4 border-blue-500 rounded-lg p-4 bg-white shadow">
          <div className="flex justify-between items-center gap-6">
            <div className="p-5">
              <h4 className="text-xl font-semibold">3</h4>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">Document Verification</h3>
              <h5 className="text-gray-500">
                Upload and verify all required documents including mark sheets, caste certificate (if applicable), domicile certificate, etc.
              </h5>
            </div>
          </div>
        </div>

        {/* STEP 4 */}
        <div className="mt-4 max-w-full hover:shadow-xl border-l-4 border-blue-500 rounded-lg p-4 bg-white shadow">
          <div className="flex justify-between items-center gap-6">
            <div className="p-5">
              <h4 className="text-xl font-semibold">4</h4>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">Choice Filling</h3>
              <h5 className="text-gray-500">
                Fill your college and branch preferences carefully. You can fill up to 1000+ choices based on your rank and category.
              </h5>
            </div>
          </div>
        </div>

        {/* STEP 5 */}
        <div className="mt-4 max-w-full hover:shadow-xl border-l-4 border-blue-500 rounded-lg p-4 bg-white shadow">
          <div className="flex justify-between items-center gap-6">
            <div className="p-5">
              <h4 className="text-xl font-semibold">5</h4>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">Seat Allotment</h3>
              <h5 className="text-gray-500">
                Based on your rank, category, and choices, seats are allotted in multiple rounds. Check results on the ACPC portal.
              </h5>
            </div>
          </div>
        </div>

        {/* STEP 6 */}
        <div className="mt-4 max-w-full hover:shadow-xl border-l-4 border-blue-500 rounded-lg p-4 bg-white shadow">
          <div className="flex justify-between items-center gap-6">
            <div className="p-5">
              <h4 className="text-xl font-semibold">6</h4>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">Fee Payment & Reporting</h3>
              <h5 className="text-gray-500">
                Pay the admission fee online and report to the allotted college within the specified deadline with original documents.
              </h5>
            </div>
          </div>
        </div>

      </div>

      {/* IMPORTANT DATES */}
      <div className="m-10 mx-10 rounded-lg" data-aos="fade-up" data-aos-delay="800">
        <h3 className="text-4xl font-bold">🗓️ Important Dates (Tentative)</h3>
      </div>

      <div className="overflow-x-auto ml-20 mr-20 mt-4 rounded-lg" data-aos="fade-up" data-aos-delay="1000">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead>
            <tr className="bg-blue-500 h-14 text-white">
              <th className="px-4 py-2 text-left">Event</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr className="h-14">
              <td className="px-4 py-2">JEE Main Session 1</td>
              <td>January 22–31, 2026</td>
              <td><span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">Upcoming</span></td>
            </tr>

            <tr className="h-14">
              <td className="px-4 py-2">JEE Main Session 2</td>
              <td>April 1–15, 2026</td>
              <td><span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Scheduled</span></td>
            </tr>

            <tr className="h-14">
              <td className="px-4 py-2">ACPC Registration Opens</td>
              <td>May 20, 2026</td>
              <td><span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Scheduled</span></td>
            </tr>

            <tr className="h-14">
              <td className="px-4 py-2">Choice Filling Begins</td>
              <td>June 10–25, 2026</td>
              <td><span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Scheduled</span></td>
            </tr>

            <tr className="h-14">
              <td className="px-4 py-2">Round 1 Allotment</td>
              <td>June 28, 2026</td>
              <td><span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Scheduled</span></td>
            </tr>

            <tr className="h-14">
              <td className="px-4 py-2">Round 2 Allotment</td>
              <td>July 10, 2026</td>
              <td><span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Scheduled</span></td>
            </tr>

            <tr className="h-14">
              <td className="px-4 py-2">Round 3 Allotment</td>
              <td>July 20, 2026</td>
              <td><span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Scheduled</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DOCUMENTS */}
      <div className="p-6">
        <h3 className="text-4xl font-bold">📃 Required Documents</h3>
      </div>

      <div className="flex justify-center space-x-4 mt-4">

        <div className="bg-white rounded-lg shadow-md max-w-lg p-10">
          <h3 className="text-lg font-semibold mb-3">✅ Mandatory Documents</h3>
          <ul className="space-y-1">
            <li>✅ JEE Main / GUJCET Scorecard</li>
            <li>✅ 10th Mark Sheet & Certificate</li>
            <li>✅ 12th Mark Sheet & Certificate</li>
            <li>✅ School Leaving Certificate</li>
            <li>✅ Domicile Certificate</li>
            <li>✅ Aadhar Card</li>
            <li>✅ Passport Photos</li>
            <li>✅ Character Certificate</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md max-w-lg p-10">
          <h3 className="text-lg font-semibold mb-3">❗Category-Based Documents</h3>
          <ul className="space-y-1">
            <li>❗Caste Certificate</li>
            <li>❗Caste Validity</li>
            <li>❗Non-Creamy Layer</li>
            <li>❗Income Certificate</li>
            <li>❗Disability Certificate</li>
            <li>❗Sports Certificate</li>
            <li>❗Defense Certificate</li>
            <li>❗Migration Certificate</li>
          </ul>
        </div>

      </div>

      {/* TIPS */}
      <div className="p-6 mx-4 m-4">
        <h3 className="text-4xl font-bold">Important Tips & Guidelines</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        <div className="bg-green-100 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Choice Filling Strategy</h3>
          <p className="text-sm">
            Fill maximum choices (1000+) in order of your true preference.
          </p>
        </div>

        <div className="bg-blue-100 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Meet Deadlines</h3>
          <p className="text-sm">Never miss deadlines.</p>
        </div>

        <div className="bg-yellow-100 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Document Verification</h3>
          <p className="text-sm">Keep documents ready.</p>
        </div>

        <div className="bg-red-100 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Seat Acceptance</h3>
          <p className="text-sm">Accept seat and pay fees.</p>
        </div>

      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg p-10 text-center mt-4">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Predict Your Rank?
        </h2>

        <Link to="/predict" className="bg-white text-blue-700 px-6 py-2 rounded-md">
          Predict Your Rank
        </Link>
      </div>

    </div>
  );
};

export default Admission;