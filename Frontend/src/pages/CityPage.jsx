import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const cityData = {
  ahmedabad: {
    title: "Engineering Colleges in Ahmedabad",
    colleges: [
      {
        name: "Gujarat Technological University",
        image: "https://www.gtu.ac.in/assets/img/gtu-building.jpg",
        description: "Location: Ahmedabad, Gujarat",
        contact: "info@gtu.edu.in | +91 98765 43210",
        url: "https://www.gtu.ac.in/",
      },
      {
        name: "Nirma University",
        image: "https://bookuradmission.com/campus_tour/16401534845.png",
        description: "Location: Ahmedabad, Gujarat",
        contact: "admissions@nirmauni.ac.in | +91 98765 43211",
        url: "https://admissions.nirmauni.ac.in/home.html",
      },
      {
        name: "Adani University",
        image: "https://www.adaniuni.ac.in/wp-content/uploads/2023/03/adani_university_phd-1024x682.jpg",
        description: "Location: Ahmedabad, Gujarat",
        contact: "it@nirmauni.ac.in | +91 98765 43212",
        url: "https://www.adaniuni.ac.in/",
      },
      {
        name: "Ahmedabad Institute of Technology",
        image: "https://www.targetadmission.com/img/colleges/newc/2964-170838.jpg",
        description: "Location: Ahmedabad, Gujarat",
        contact: "info@aitindia.in | +91 98765 43213",
        url: "http://www.aitindia.in",
      },
      {
        name: "Indian Institute of Technology Gandhinagar",
        image: "https://img.jagranjosh.com/images/2022/April/1242022/416452_351420638258614_665024566_o.jpg",
        description: "Location: Chandkheda, Ahmedabad - 382424",
        contact: "info@iitgn.ac.in | +91 79 2326 2600",
        url: "https://iitgn.ac.in/",
      },
    ],
  },
  gandhinagar: {
    title: "Engineering Colleges in Gandhinagar",
    colleges: [
      {
        name: "PDPU - Pandit Deendayal Petroleum University",
        image: "https://via.placeholder.com/400x250?text=PDPU+-+Pandit+Deendayal+Petroleum+University",
        description: "Branch: Computer Engineering | Cutoff Rank: 1500 | Fees: ₹1,90,000",
        contact: "info@pdpu.ac.in | +91 98765 43214",
      },
      {
        name: "LDRP-ITR",
        image: "https://via.placeholder.com/400x250?text=LDRP-ITR",
        description: "Branch: Computer Engineering | Cutoff Rank: 4500 | Fees: ₹1,50,000",
        contact: "admissions@ldrp.ac.in | +91 98765 43215",
      },
    ],
  },
  anand: {
    title: "Engineering Colleges in Anand",
    colleges: [
      {
        name: "CHARUSAT",
        image: "https://leavestranscript.com/wp-content/uploads/2020/08/charotar-university-of-science-and-technology.jpg",
        description: "Location: Changa, Anand",
        contact: "info@charusat.ac.in | +91 2697 265011",
        url: "https://www.charusat.ac.in",
      },
      {
        name: "BVM Engineering College",
        image: "https://cache.careers360.mobi/media/presets/720X480/colleges/social-media/media-gallery/4774/2018/4/27/Birla-Vishvakarma-Mahavidyalaya-Anand-1.jpg",
        description: "Location: Vallabh Vidyanagar",
        contact: "principal@bvmengineering.ac.in | +91 2692 230104",
        url: "https://www.bvmengineering.ac.in",
      },
      {
        name: "ADIT",
        image: "https://tse4.mm.bing.net/th/id/OIP.zKuvBxT6QxtJRqR_P2EWCwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
        description: "Location: New Vidyanagar",
        contact: "info@adit.ac.in | +91 2692 233680",
        url: "https://adit.ac.in",
      },
      {
        name: "GCET",
        image: "https://www.campusoption.com/images/colleges/gallery/25_05_16_064636_College.png",
        description: "Location: Vallabh Vidyanagar",
        contact: "info@gcet.ac.in | +91 2692 236896",
        url: "https://gcet.ac.in",
      },
      {
        name: "MBIT",
        image: "https://www.mbit.edu.in/wp-content/uploads/2018/04/MBICTBuilding-1024x623.jpg",
        description: "Location: Vallabh Vidyanagar",
        contact: "info@mbit.edu.in | +91 2692 233400",
        url: "https://mbit.edu.in",
      },
      {
        name: "BBIT",
        image: "https://tse4.mm.bing.net/th/id/OIP.2jUN5ixEy4DE2hSJINhyYwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
        description: "Location: Vallabh Vidyanagar",
        contact: "bbit@ecvm.net | +91 2692 237240",
        url: "https://ecvm.net",
      },
      {
        name: "Sardar Patel University",
        image: "https://tse1.mm.bing.net/th/id/OIP.aHwbVEgZDWh8FNGXFqlEkwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
        description: "Location: Vallabh Vidyanagar",
        contact: "registrar@spuvvn.edu | +91 2692 226801",
        url: "https://www.spuvvn.edu",
      },
    ],
  },
  surat: {
    title: "Engineering Colleges in Surat",
    colleges: [
      {
        name: "SVIT - Vasantrao Narayan College",
        image: "https://via.placeholder.com/400x250?text=SVIT+-+Vasantrao+Narayanan+College",
        description: "Branch: Electronics & Communication | Cutoff Rank: 4200 | Fees: ₹1,20,000",
        contact: "info@svitvasad.ac.in | +91 98765 43217",
      },
      {
        name: "Govt Engineering College Surat",
        image: "https://via.placeholder.com/400x250?text=Govt+Engineering+College+Surat",
        description: "Branch: Civil Engineering | Cutoff Rank: 8500 | Fees: ₹56,000",
        contact: "principal@gecsurat.ac.in | +91 98765 43218",
      },
    ],
  },
  vadodara: {
    title: "Engineering Colleges in Vadodara",
    colleges: [
      {
        name: "Parul University",
        image: "https://via.placeholder.com/400x250?text=Parul+University",
        description: "Branch: Information Technology | Cutoff Rank: 6200 | Fees: ₹1,70,000",
        contact: "admissions@paruluniversity.ac.in | +91 98765 43219",
      },
    ],
  },
};

const CityPage = ({ cityKey }) => {
  useEffect(() => {}, []);

  const city = cityData[cityKey];

  if (!city) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">City page not found</h1>
          <Link to="/" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 shadow-lg">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">{city.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {city.colleges.map((college) => (
              <div
                key={college.name}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
                  <p className="text-gray-600 mb-4">{college.description}</p>
                  <p className="text-gray-500 mb-2"><strong>Contact:</strong> {college.contact}</p>
                  {college.url && (
                    <a
                      href={college.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-300 py-14 px-10 w-full">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">ACPC Predictor</h2>
            <p>Your trusted partner for engineering college admission guidance in Gujarat.</p>
          </div>
          <div>
            <h2 className="text-white mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link to="/predict" className="hover:text-white transition">College Predictor</Link></li>
              <li><Link to="/fees" className="hover:text-white transition">Fees Comparison</Link></li>
              <li><Link to="/admission" className="hover:text-white transition">Admission Guide</Link></li>
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-white mb-4">Resources</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">ACPC Official Website</a></li>
              <li><a href="#" className="hover:text-white transition">Previous Year Cutoffs</a></li>
              <li><a href="#" className="hover:text-white transition">College Rankings</a></li>
              <li><a href="#" className="hover:text-white transition">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-white mb-4">Contact</h2>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@acpcpredictor.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Gujarat, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
          © 2026 ACPC College Predictor. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CityPage;
