import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Pacientes from "../pages/Pacientes";
import Medicos from "../pages/Medicos";
import Consultorios from "../pages/Consultorios";
import Citas from "../pages/Citas";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";


export default function AppRouter() {
  return (
    <BrowserRouter>
       <Routes>

    {/* LOGIN */}
    <Route path="/login" element={<Login />} />

    {/* RUTA PROTEGIDA */}
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

        <Route
          path="/medicos"
          element={
            <Layout>
              <Medicos />
            </Layout>
          }
        />

<Route
  path="/consultorios"
  element={
    <Layout>
      <Consultorios />
    </Layout>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

