import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validación simple (simulada)
    if (correo === "mai_kol21@hotmail.com" && password === "mai.21") {

      // Guardar sesión
      localStorage.setItem("usuario", JSON.stringify({ correo }));

      // Redirigir
      navigate("/");
    } else {
      setMensaje("Credenciales incorrectas");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

      <form onSubmit={handleLogin} className="card p-4 shadow" style={{ width: "350px" }}>
        
        <h3 className="text-center mb-3">Iniciar Sesión</h3>

        {mensaje && <div className="alert alert-danger">{mensaje}</div>}

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">
          Ingresar
        </button>

      </form>

    </div>
  );
}
