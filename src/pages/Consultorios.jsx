import { useEffect, useState } from "react";

import {
  getConsultorios,
  crearConsultorio,
  actualizarConsultorio,
  eliminarConsultorio
} from "../services/consultorioService";

export default function Consultorios() {

  const [consultorios, setConsultorios] = useState([]);

  const [form, setForm] = useState({
    numero: "",
    torre: "",
    piso: "",
    estado: ""
  });

  const [editando, setEditando] = useState(false);

  const [idActual, setIdActual] = useState(null);

  const [busqueda, setBusqueda] = useState("");


  // CARGAR
  useEffect(() => {

    cargarConsultorios();

  }, []);


  const cargarConsultorios = async () => {

    const data = await getConsultorios();

    setConsultorios(data);

  };


  // INPUTS
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  // GUARDAR
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (editando) {

      await actualizarConsultorio(
        idActual,
        form
      );

      setEditando(false);

      setIdActual(null);

    } else {

      await crearConsultorio(form);

    }

    setForm({
      numero: "",
      torre: "",
      piso: "",
      estado: ""
    });

    cargarConsultorios();

  };


  // EDITAR
  const editar = (consultorio) => {

    setForm(consultorio);

    setEditando(true);

    setIdActual(consultorio.id);

  };


  // ELIMINAR
  const eliminar = async (id) => {

    await eliminarConsultorio(id);

    cargarConsultorios();

  };


  // FILTRO
  const consultoriosFiltrados =
    consultorios.filter((c) =>

      String(c.numero || "")
        .toLowerCase()
        .includes(
          String(busqueda || "")
          .toLowerCase()
        )

    );


  return (

    <div className="container mt-4">

      <h1 className="text-center mb-4">
        Gestión de Consultorios
      </h1>


      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow mb-4"
      >

        <div className="row">

          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              name="numero"
              placeholder="Número"
              value={form.numero}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              name="torre"
              placeholder="Torre"
              value={form.torre}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              name="piso"
              placeholder="Piso"
              value={form.piso}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              name="estado"
              placeholder="Estado"
              value={form.estado}
              onChange={handleChange}
            />
          </div>

        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >

          {editando
            ? "Actualizar"
            : "Guardar"}

        </button>

      </form>


      {/* TABLA */}
      <div className="card shadow">

        <div className="card-body">

          <h3>
            Lista de Consultorios
          </h3>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar consultorio..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
          />


          <table className="table table-striped">

            <thead className="table-dark">

              <tr>
                <th>Número</th>
                <th>Torre</th>
                <th>Piso</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>

            </thead>

            <tbody>

              {consultoriosFiltrados.map((c) => (

                <tr key={c.id}>

                  <td>{c.numero}</td>
                  <td>{c.torre}</td>
                  <td>{c.piso}</td>
                  <td>{c.estado}</td>

                  <td>

                    <button
                      className="btn btn-warning me-2"
                      onClick={() => editar(c)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => eliminar(c.id)}
                    >
                      Eliminar
                    </button>

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