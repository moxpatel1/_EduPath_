import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="m-0 p-0">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <main className="relative w-full h-screen overflow-hidden">

        <img
          src="/media/images/forntimage.jpg"
          alt="Engineering College Campus"
          className="w-full h-full object-cover cursor-pointer"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/70"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-yellow-300">Engineering College</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
              ACPC College Predictor & Guidance Portal - Your complete solution for engineering college admission in Gujarat. Get accurate predictions, compare fees, explore scholarships, and make informed decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/predict"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-full hover:from-yellow-500 hover:to-orange-600 shadow-lg"
              >
                🚀 Predict College
              </Link>

              <Link
                to="/admission"
                className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-white/30 hover:border-white/50 shadow-lg"
              >
                📚 Admission Guidance
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>

      </main>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 px-4 max-w-6xl mx-auto">

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-lg p-8 text-center border border-blue-200">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white text-2xl shadow-lg">
            🎓
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mb-2">50+</p>
          <p className="text-gray-600 font-medium">Engineering Colleges</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-lg p-8 text-center border border-green-200">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white text-2xl shadow-lg">
            👥
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mb-2">10,000+</p>
          <p className="text-gray-600 font-medium">Students Guided</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-lg p-8 text-center border border-purple-200">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white text-2xl shadow-lg">
            📈
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mb-2">95%</p>
          <p className="text-gray-600 font-medium">Prediction Accuracy</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl shadow-lg p-8 text-center border border-orange-200">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-2xl shadow-lg">
            📍
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mb-2">25+</p>
          <p className="text-gray-600 font-medium">Cities Covered</p>
        </div>

      </div>

      {/* FEATURES */}
      <div className="flex flex-col items-center py-20">

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg mb-8">
          ✨ Complete Solution
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-center leading-tight">
          Everything You Need for
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            ACPC Admission
          </span>
        </h2>

        <p className="mt-4 text-gray-600 text-xl text-center max-w-3xl leading-relaxed">
          From college prediction to final admission, we provide all the tools and information you need to succeed
        </p>

        <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-6 mt-16 w-full">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Smart College Predictor</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Advanced algorithm that analyzes your JEE/Main rank, category, and preferences to predict your admission chances in Gujarat engineering colleges.
              </p>
              <Link to="/predict" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg">
                Learn more →
              </Link>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Complete Admission Guide</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Step-by-step guidance through the entire ACPC admission process, from registration to seat allotment and document verification.
              </p>
              <Link to="/admission" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-lg">
                Learn more →
              </Link>
            </div>

          </div>
        </section>

      </div>

      {/* CITIES */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Explore Colleges by City
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover engineering colleges across major cities in Gujarat
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

            <Link to="/ahmedabad" className="group">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg flex flex-col items-center justify-center rounded-3xl border-4 border-white">
                <span className="text-4xl mb-2">🏛️</span>
                <span className="text-white font-bold text-xl">Ahmedabad</span>
              </div>
            </Link>

            <Link to="/gandhinagar" className="group">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 shadow-lg flex flex-col items-center justify-center rounded-3xl border-4 border-white">
                <span className="text-4xl mb-2">🏛️</span>
                <span className="text-white font-bold text-xl">Gandhinagar</span>
              </div>
            </Link>

            <Link to="/anand" className="group">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg flex flex-col items-center justify-center rounded-3xl border-4 border-white">
                <span className="text-4xl mb-2">🏛️</span>
                <span className="text-white font-bold text-xl">Anand</span>
              </div>
            </Link>

            <Link to="/surat" className="group">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg flex flex-col items-center justify-center rounded-3xl border-4 border-white">
                <span className="text-4xl mb-2">🏛️</span>
                <span className="text-white font-bold text-xl">Surat</span>
              </div>
            </Link>

            <Link to="/vadodara" className="group">
              <div className="h-48 bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg flex flex-col items-center justify-center rounded-3xl border-4 border-white">
                <span className="text-4xl mb-2">🏛️</span>
                <span className="text-white font-bold text-xl">Vadodara</span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-gray-300 py-16 px-10">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

          <div className="md:col-span-1">
            <h2 className="text-white text-2xl font-bold mb-6 flex items-center">
              <span className="text-blue-400 mr-2">🎓</span>
              ACPC Predictor
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Your trusted partner for engineering college admission guidance in Gujarat. Making dreams come true since 2024.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600">
                <span className="text-sm">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600">
                <span className="text-sm">🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600">
                <span className="text-sm">📧</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/predict" className="text-gray-400 hover:text-white flex items-center"><span className="mr-2">→</span>College Predictor</Link></li>
              <li><Link to="/admission" className="text-gray-400 hover:text-white flex items-center"><span className="mr-2">→</span>Admission Guide</Link></li>
              <li><Link to="/fees" className="text-gray-400 hover:text-white flex items-center"><span className="mr-2">→</span>Fee Structure</Link></li>
              <li><Link to="/results" className="text-gray-400 hover:text-white flex items-center"><span className="mr-2">→</span>Results</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white flex items-center"><span className="mr-2">→</span>FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white flex items-center"><span className="mr-2">→</span>ACPC Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white flex items-center"><span className="mr-2">→</span>Cutoff Analysis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white flex items-center"><span className="mr-2">→</span>College Reviews</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-3">
              <p className="text-gray-400 flex items-center">
                <span className="mr-2">📧</span>
                info@acpcpredictor.com
              </p>
              <p className="text-gray-400 flex items-center">
                <span className="mr-2">📱</span>
                +91 98765 43210
              </p>
              <p className="text-gray-400 flex items-center">
                <span className="mr-2">📍</span>
                Gujarat, India
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2026 ACPC College Predictor. All rights reserved.
            <span className="text-blue-400 ml-2">Made for students</span>
          </p>
        </div>

      </footer>

    </div>
  );
};

export default Home;