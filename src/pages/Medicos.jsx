import { useEffect, useState } from "react";
import {
  getMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
} from "../services/medicoService";

export default function Medicos() {

  const [medicos, setMedicos] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    tipoDocumento: "",
    documento: "",
    especialidad: "",
    correo: "",
    telefono: "",
  });

  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarMedicos();
  }, []);

  const cargarMedicos = async () => {
    const data = await getMedicos();
    setMedicos(data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      apellidos: "",
      tipoDocumento: "",
      documento: "",
      especialidad: "",
      correo: "",
      telefono: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDACIONES
    if (
      !form.nombre ||
      !form.apellidos ||
      !form.tipoDocumento ||
      !form.documento ||
      !form.especialidad
    ) {
      setMensaje("Campos obligatorios incompletos");
      return;
    }

    if (!/^\d+$/.test(form.documento)) {
      setMensaje("Documento solo números");
      return;
    }

    const existe = medicos.some(
      (m) =>
        m.documento === form.documento &&
        m.tipoDocumento === form.tipoDocumento &&
        m.id !== idActual
    );

    if (existe) {
      setMensaje("Documento ya registrado");
      return;
    }

    // CRUD
    if (editando) {
      await actualizarMedico(idActual, form);
      setMensaje("Médico actualizado");
      setEditando(false);
      setIdActual(null);
    } else {
      await crearMedico(form);
      setMensaje("Médico guardado");
    }

    resetForm();
    cargarMedicos();
  };

  const editar = (m) => {
    setForm(m);
    setEditando(true);
    setIdActual(m.id);
  };

  const eliminar = async (id) => {
    await eliminarMedico(id);
    setMensaje("Médico eliminado");
    cargarMedicos();
  };

  const medicosFiltrados = medicos.filter((m) =>
  String(m.nombre || "")
    .toLowerCase()
    .includes(
      String(busqueda || "").toLowerCase()
    )
);

  return (
    <div className="container mt-4">

      <h1 className="text-center mb-4">Gestión de Médicos</h1>

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
              <option value="CC">Cédula de ciudadania</option>
              <option value="CE">Cédula Extranjería</option>
               <option value="PT">Pasaporte</option>
            </select>
          </div>

          <div className="col-md-4 mb-2">
            <input className="form-control" name="documento" placeholder="Documento" value={form.documento} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-2">
            <input className="form-control" name="especialidad" placeholder="Especialidad" value={form.especialidad} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-2">
            <input className="form-control" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-2">
            <input className="form-control" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
          </div>

        </div>

        <button className="btn btn-primary mt-3">
          {editando ? "Actualizar" : "Guardar"}
        </button>
      </form>

      {/* TABLA */}
      <div className="card shadow">
        <div className="card-body">

          <h4>Lista de Médicos</h4>

          <input
            className="form-control mb-3"
            placeholder="Buscar médico..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <table className="table table-striped">
            <thead className="table-dark">
               <tr>
                  <th>Nombre</th>
                  <th>Especialidad</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>

            </thead>

            <tbody>
              {medicosFiltrados.map((m) => (
                <tr key={m.id}>
                  <td>{m.nombre}</td>
                  <td>{m.especialidad}</td>
                  <td>{m.correo}</td>
                  <td>{m.telefono}</td>

                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => editar(m)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => eliminar(m.id)}>Eliminar</button>
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
