import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // ❌ If not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in → show page
  return children;
};

export default ProtectedRoute;