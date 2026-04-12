import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Fees from "./pages/Fees";
import Login from "./pages/Login";
import Predictor from "./pages/Predictor";
import Admission from "./pages/Admission";
import Signup from "./pages/Signup";
import Results from "./pages/Results";
import CityPage from "./pages/CityPage";

import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Home />} />

        {/* ✅ PROTECTED ROUTES */}

        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <Fees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/predict"
          element={
            <ProtectedRoute>
              <Predictor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admission"
          element={
            <ProtectedRoute>
              <Admission />
            </ProtectedRoute>
          }
        />
<<<<<<< HEAD

        <Route
          path="/ahmedabad"
          element={
            <ProtectedRoute>
              <CityPage cityKey="ahmedabad" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gandhinagar"
          element={
            <ProtectedRoute>
              <CityPage cityKey="gandhinagar" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/anand"
          element={
            <ProtectedRoute>
              <CityPage cityKey="anand" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/surat"
          element={
            <ProtectedRoute>
              <CityPage cityKey="surat" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vadodara"
          element={
            <ProtectedRoute>
              <CityPage cityKey="vadodara" />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Routes>
=======
>>>>>>> 8ddbebea83b0594726db7fe0dd3ae9c271612161
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;