// Importamos el logo
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Layout({ children }) {
  const logout = () => {
  localStorage.removeItem("usuario");
  window.location.href = "/login";
};

  return (
    <div className="d-flex">

      {/* SIDEBAR */}
      <div
        className="text-white p-3"
        style={{ 
          width: "250px", 
          minHeight: "100vh",
          background: "linear-gradient(180deg, #0b5ed7, #198754)"
        }}
      >
        {/* LOGO */}
        <div className="text-center mb-4">
          <img 
            src={logo} 
            alt="SisMedic" 
            style={{ width: "140px" }} 
          />
          <h6 className="mt-2">SisMedic</h6>
          <small>Gestión de salud</small>
        </div>

        {/* MENÚ IZQUIERDO */}
        <ul className="nav flex-column">

          <li className="nav-item mb-2">
           <NavLink 
             to="/" 
             className={({ isActive }) => 
              "nav-link " + (isActive ? "bg-white text-dark rounded" : "text-white")
             }
             >🧑‍⚕️ Pacientes
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink to="/medicos" className={({ isActive }) => "nav-link " + (isActive ? "bg-white text-dark rounded" : "text-white")}>
             👨‍⚕️ Médicos
            </NavLink>
          
          </li>

          <li className="nav-item mb-2">
            <NavLink to="/citas" className={({ isActive }) => "nav-link " + (isActive ? "bg-white text-dark rounded" : "text-white")}>
              📅 Citas
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/consultorios" className={({ isActive }) => "nav-link " + (isActive ? "bg-white text-dark rounded" : "text-white")}>
             🏥 Consultorios
            </NavLink>
          </li>
          <li className="nav-item mt-3">
             <button className="btn btn-danger w-100" onClick={logout}>
                Cerrar sesión
             </button>
            </li>
        </ul>
      </div>

      {/* CONTENIDO */}
      <div className="flex-grow-1 bg-light">

        {/* HEADER */}
        <div 
          className="shadow-sm p-3 d-flex justify-content-between align-items-center"
          style={{ backgroundColor: "white", borderBottom: "3px solid #0b5ed7" }}
        >
          <h5 className="mb-0">SisMedic - Sistema de Gestión</h5>
          <span className="text-success">● En línea</span>
        </div>

        {/* CONTENIDO DINÁMICO */}
        <div className="p-4">
          {children}
        </div>

      </div>

    </div>
  );
}

