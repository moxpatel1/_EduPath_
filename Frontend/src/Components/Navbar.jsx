import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Load user safely
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch {
      setUser(null);
    }
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="h-14 flex justify-between items-center px-6 bg-white shadow-md">

      {/* LOGO */}
      <Link to="/">
        <img
          src="/media/images/logo_1.png"
          className="h-8 object-contain"
          alt="logo"
        />
      </Link>

      {/* LINKS */}
      <ul className="flex gap-3 text-sm items-center">

        <li>
          <Link to="/" className="px-3 py-1 rounded hover:bg-sky-600 hover:text-white transition">
            Home
          </Link>
        </li>

        <li>
          <Link to="/predict" className="px-3 py-1 rounded hover:bg-sky-600 hover:text-white transition">
            Predict College
          </Link>
        </li>

        <li>
          <Link to="/admission" className="px-3 py-1 rounded hover:bg-sky-600 hover:text-white transition">
            Admission Guide
          </Link>
        </li>

        <li>
          <Link to="/fees" className="px-3 py-1 rounded hover:bg-sky-600 hover:text-white transition">
            Fees
          </Link>
        </li>

        {/* ✅ AUTH UI */}
        {user ? (
          <>
            <li className="text-blue-600 font-medium">
              Hi, {user.name}
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="px-3 py-1 rounded hover:bg-sky-600 hover:text-white transition">
                Login
              </Link>
            </li>

            <li>
              <Link to="/signup" className="px-3 py-1 rounded hover:bg-sky-600 hover:text-white transition">
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