import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute";

import Pacientes from "../pages/Pacientes";
import Medicos from "../pages/Medicos";
import Consultorios from "../pages/Consultorios";
import Citas from "../pages/Citas";
import Informacion from "../pages/Informacion";
import Login from "../pages/Login";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Inicio de sesión */}
        <Route path="/login" element={<Login />} />

        {/* Módulo de pacientes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Pacientes />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Módulo de citas */}
        <Route
          path="/citas"
          element={
            <PrivateRoute>
              <Layout>
                <Citas />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Módulo de médicos */}
        <Route
          path="/medicos"
          element={
            <PrivateRoute>
              <Layout>
                <Medicos />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Módulo de consultorios */}
        <Route
          path="/consultorios"
          element={
            <PrivateRoute>
              <Layout>
                <Consultorios />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Centro de información */}
        <Route
          path="/informacion"
          element={
            <PrivateRoute>
              <Layout>
                <Informacion />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}