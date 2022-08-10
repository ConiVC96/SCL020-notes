import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Home } from "./components/views/Home";
import { Login } from "./components/views/Login";
import { Register } from "./components/views/Register";
import { ProtectedRoute } from "./components/views/ProtectedRoute";
import { Show } from "./components/views/Show";
import { Create } from "./components/views/Create";
import { Edit } from "./components/views/Edit";

function App() {
  return (
    // componentes solo pueden tener un elemento padre, solo devolver 1 bloque
    //todas mis rutas podran acceder a las propiedades de AuthProvider (children)
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/show"
          element={
            <ProtectedRoute>
              <Show />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
