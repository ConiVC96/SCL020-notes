import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from "./components/Register";
import Show from "./components/Show";
import Create from "./components/Create";
import Edit from "./components/Edit";
import { AuthProvider } from "./context/authContext";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/show"
          element={<Show />}
        />
        <Route
          path="/create"
          element={<ProtectedRoute><Create /></ProtectedRoute>}
        />
        <Route
          path="/edit/:id"
          element={<ProtectedRoute><Edit /></ProtectedRoute>}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
