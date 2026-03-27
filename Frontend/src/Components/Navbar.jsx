import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

   const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  return (
    <nav className="flex justify-between items-center p-5 bg-white shadow-lg">

      {/* Logo */}
      <div className="font-bold">
        <img
          src="/media/images/logo1.png"
          className="w-32"
          alt="logo"
        />
      </div>

      {/* Links */}
    <ul className="flex space-x-4 text-black items-center">

  <li>
    <Link to="/" className="px-4 py-2 rounded hover:bg-sky-700 hover:text-white transition">
      Home
    </Link>
  </li>

  <li>
    <Link to="/predict" className="px-4 py-2 rounded hover:bg-sky-700 hover:text-white transition">
      Predict College
    </Link>
  </li>

  <li>
    <Link to="/admission" className="px-4 py-2 rounded hover:bg-sky-700 hover:text-white transition">
      Admission Guide
    </Link>
  </li>

  <li>
    <Link to="/fees" className="px-4 py-2 rounded hover:bg-sky-700 hover:text-white transition">
      Fees/Scholarships
    </Link>
  </li>

  {/* ✅ CONDITIONAL UI */}
  {user ? (
    <>
      <li className="px-4 py-2 font-semibold text-blue-600">
        Hi, {user.name}
      </li>

      <li>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/login" className="px-4 py-2 rounded hover:bg-sky-700 hover:text-white transition">
          Login
        </Link>
      </li>

      <li>
        <Link to="/signup" className="px-4 py-2 rounded hover:bg-sky-700 hover:text-white transition">
          Signup
        </Link>
      </li>
    </>
  )}

</ul>
    </nav>
  );
};

export default Navbar;