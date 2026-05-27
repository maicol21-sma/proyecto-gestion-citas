import { useEffect, useState } from "react";

// Importación de servicios para la gestión de pacientes
import {
  getPacientes,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../services/pacienteService";

export default function Pacientes() {

  // ESTADOS
  const [pacientes, setPacientes] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    tipoDocumento: "",
    documento: "",
    correo: "",
    telefono: "",
    direccion: "",
    genero: "",
    eps: "",
  });

  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");

  // EFECTO INICIAL
  useEffect(() => {
    cargarPacientes();
  }, []);

  // FUNCIONES

  // Cargar datos
  const cargarPacientes = async () => {
    const data = await getPacientes();
    setPacientes(data);
  };

  // Manejo inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Reset formulario
  const resetForm = () => {
    setForm({
      nombre: "",
      apellidos: "",
      tipoDocumento: "",
      documento: "",
      correo: "",
      telefono: "",
      direccion: "",
      genero: "",
      eps: "",
    });
  };

  // Guardar / actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDACIONES

    // Campos obligatorios
    if (
      !form.nombre ||
      !form.apellidos ||
      !form.tipoDocumento ||
      !form.documento ||
      !form.correo ||
      !form.telefono
    ) {
      setMensaje("Todos los campos obligatorios deben estar llenos");
      return;
    }

    // Documento solo números
    if (!/^\d+$/.test(form.documento)) {
      setMensaje("El documento solo debe contener números");
      return;
    }

    // Formato correo
    if (!/\S+@\S+\.\S+/.test(form.correo)) {
      setMensaje("Correo no válido");
      return;
    }

    // Documento duplicado
    const existe = pacientes.some(
      (p) =>
        p.documento === form.documento &&
        p.tipoDocumento === form.tipoDocumento &&
        p.id !== idActual
    );

    if (existe) {
      setMensaje("Este documento ya está registrado");
      return;
    }

    // Correo duplicado
    const correoExiste = pacientes.some(
      (p) => p.correo === form.correo && p.id !== idActual
    );

    if (correoExiste) {
      setMensaje("Este correo ya está registrado");
      return;
    }

    // GUARDAR / ACTUALIZAR
    if (editando) {
      await actualizarPaciente(idActual, form);
      setMensaje("Paciente actualizado correctamente");
      setEditando(false);
      setIdActual(null);
    } else {
      await crearPaciente(form);
      setMensaje("Paciente guardado correctamente");
    }

    resetForm();
    cargarPacientes();
  };

  // Editar
  const editar = (p) => {
    setForm(p);
    setEditando(true);
    setIdActual(p.id);
  };

  // Eliminar
  const eliminar = async (id) => {
    await eliminarPaciente(id);
    setMensaje("Paciente eliminado correctamente");
    cargarPacientes();
  };

  // Filtro
  const pacientesFiltrados = pacientes.filter((p) =>
  (p.nombre || "")
    .toLowerCase()
    .includes(busqueda.toLowerCase())
);

  // RENDER
  return (
    <div className="container mt-4">

      <h1 className="text-center mb-4">Gestión de Pacientes</h1>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow">
        <div className="row">

          <div className="col-md-4 mb-2">
            <input className="form-control" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-2">
            <input className="form-control" name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-2">
            <select className="form-control" name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange}>
              <option value="">Tipo Documento</option>
              <option value="CC">Cédula de Ciudadania</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>

          <div className="col-md-4 mb-2">
            <input className="form-control" name="documento" placeholder="Documento" value={form.documento} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-2">
            <input className="form-control" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-2">
            <input className="form-control" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-2">
            <input className="form-control" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-2">
            <input className="form-control" name="genero" placeholder="Género" value={form.genero} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-2">
            <input className="form-control" name="eps" placeholder="EPS" value={form.eps} onChange={handleChange} />
          </div>

        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {editando ? "Actualizar" : "Guardar"}
        </button>
      </form>

      {/* TABLA */}
      <div className="card shadow">
        <div className="card-body">

          <h4>Lista de Pacientes</h4>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar paciente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Documento</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>EPS</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {pacientesFiltrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.apellidos}</td>
                  <td>{p.tipoDocumento} {p.documento}</td>
                  <td>{p.correo}</td>
                  <td>{p.telefono}</td>
                  <td>{p.eps}</td>

                  <td>
                    <button className="btn btn-outline-primary me-2" onClick={() => editar(p)}>Editar</button>
                    <button className="btn btn-outline-danger" onClick={() => eliminar(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}