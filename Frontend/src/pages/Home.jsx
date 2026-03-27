import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="m-0 p-0">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <main className="relative w-full h-screen">

        <img
          src="/media/images/forntimage.jpg"
          alt="Sample"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
        />

        <div className="absolute inset-0 bg-blue-500/70"></div>

        <div className="absolute inset-0 flex items-center justify-between p-4 bottom-8 ml-16" data-aos="fade-right">
          <div>

            <h1 className="text-gray-100 text-5xl font-bold drop-shadow-lg">
              Find Your Perfect Engineering College
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed mt-4">
              ACPC College Predictor & Guidance Portal - Your complete solution for engineering college admission in Gujarat. Get accurate predictions, compare fees, explore scholarships, and make informed decisions.
            </p>

            <Link
              to="/predict"
              className="bg-white text-blue-500 font-semibold text-lg px-8 py-3 rounded hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Predict College
            </Link>

            <Link
              to="/admission"
              className="bg-white text-blue-500 inline-flex font-semibold text-lg px-6 py-3 ml-5 mt-4 rounded hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Admission Guidance
            </Link>

          </div>
        </div>

      </main>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-8 mt-16 px-4" data-aos="fade-up">

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100">📊</div>
          <p className="text-4xl font-extrabold text-gray-900">50+</p>
          <p className="text-gray-600 mt-1">Engineering Colleges</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">👥</div>
          <p className="text-4xl font-extrabold text-gray-900">10,000+</p>
          <p className="text-gray-600 mt-1">Students Guided</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-purple-100">📈</div>
          <p className="text-4xl font-extrabold text-gray-900">95%</p>
          <p className="text-gray-600 mt-1">Prediction Accuracy</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-100">📍</div>
          <p className="text-4xl font-extrabold text-gray-900">25+</p>
          <p className="text-gray-600 mt-1">Cities Covered</p>
        </div>

      </div>

      {/* FEATURES */}
      <div className="flex flex-col items-center" data-aos="fade-in">

        <button className="bg-blue-600 text-white m-10 p-10 px-6 py-2 rounded">
          Complete Solution
        </button>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Everything You Need for ACPC Admission
        </h2>

        <p className="mt-4 text-gray-600 text-lg text-center">
          From college prediction to final admission, we provide all the tools and information you need to succeed
        </p>

        <section className="bg-gray-50 py-16 px-6" data-aos="fade-up">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4">Smart College Predictor</h3>
              <p className="text-gray-600 mb-6">Advanced algorithm...</p>
              <Link to="/predict" className="text-blue-600 hover:underline">Learn more →</Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4">Complete Admission Guide</h3>
              <p className="text-gray-600 mb-6">Step-by-step guidance...</p>
              <Link to="/admission" className="text-blue-600 hover:underline">Learn more →</Link>
            </div>

          </div>
        </section>

      </div>

      {/* CITIES */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">

          <Link to="/ahmedabad" className="h-40 bg-white shadow-md flex items-center justify-center">Ahmedabad</Link>
          <Link to="/gandhinagar" className="h-40 bg-white shadow-md flex items-center justify-center">Gandhinagar</Link>
          <Link to="/anand" className="h-40 bg-white shadow-md flex items-center justify-center">Anand</Link>
          <Link to="/surat" className="h-40 bg-white shadow-md flex items-center justify-center">Surat</Link>
          <Link to="/vadodara" className="h-40 bg-white shadow-md flex items-center justify-center">Vadodara</Link>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-gray-300 py-14 px-10">

        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-white text-xl font-semibold mb-4">ACPC Predictor</h2>
            <p>Your trusted partner for engineering college admission guidance.</p>
          </div>

          <div>
            <h2 className="text-white mb-4">Quick Links</h2>
            <ul>
              <li><Link to="/predict">College Predictor</Link></li>
              <li><Link to="/admission">Admission Guide</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-white mb-4">Resources</h2>
            <ul>
              <li>FAQs</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white mb-4">Contact</h2>
            <p>Email: info@acpcpredictor.com</p>
          </div>

        </div>

        <div className="border-t mt-12 pt-6 text-center">
          © 2026 ACPC College Predictor
        </div>

      </footer>

    </div>
  );
};

export default Home;