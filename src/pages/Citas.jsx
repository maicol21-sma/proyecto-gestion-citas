import { useEffect, useState } from "react";

import {
  getCitas,
  crearCita,
  eliminarCita,
  actualizarCita,
} from "../services/citaService";

import { getPacientes } from "../services/pacienteService";

import { getMedicos } from "../services/medicoService";

import { getConsultorios } from "../services/consultorioService";


export default function Citas() {

  const [citas, setCitas] = useState([]);

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);
  const [form, setForm] = useState({

    paciente_id: "",
    medico_id: "",
    consultorio_id: "",

    fecha: "",
    hora: "",

    estado: ""

  });


  // CARGAR
  useEffect(() => {

    cargarCitas();
    cargarPacientes();
    cargarMedicos();
    cargarConsultorios();

  }, []);


  const cargarCitas = async () => {

    const data = await getCitas();

    setCitas(data);

  };


  const cargarPacientes = async () => {

    const data = await getPacientes();

    setPacientes(data);

  };


  const cargarMedicos = async () => {

    const data = await getMedicos();

    setMedicos(data);

  };


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

    await actualizarCita(idActual, form);

    setEditando(false);

    setIdActual(null);

   } else {

    await crearCita(form);

   }

   setForm({

    paciente_id: "",
    medico_id: "",
    consultorio_id: "",

    fecha: "",
    hora: "",

    estado: ""

  });

  cargarCitas();

};


  // ELIMINAR
  const eliminar = async (id) => {

    await eliminarCita(id);

    cargarCitas();

  };
  const editar = (cita) => {

  setForm({

    paciente_id: cita.paciente_id,
    medico_id: cita.medico_id,
    consultorio_id: cita.consultorio_id,

    fecha: cita.fecha?.split("T")[0],

    hora: cita.hora,

    estado: cita.estado

  });

  setEditando(true);

  setIdActual(cita.id);

};


  return (

    <div className="container mt-4">

      <h1 className="text-center mb-4">
        Gestión de Citas
      </h1>


      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow mb-4"
      >

        <div className="row">


          {/* PACIENTE */}
          <div className="col-md-4 mb-2">

       <select
           className="form-control"
           name="paciente_id"
           value={form.paciente_id}
           onChange={handleChange}
       >

    <option value="">
      Seleccione paciente
    </option>

    {pacientes.map((p) => (
      <option
        key={p.id}
        value={p.id}
      >
        {p.nombre}
      </option>
    ))}

  </select>

</div>


          {/* MEDICO */}
          <div className="col-md-4 mb-3">

            <select
              className="form-control"
              name="medico_id"
              value={form.medico_id}
              onChange={handleChange}
            >

              <option value="">
                Seleccione médico
              </option>

              {medicos.map((m) => (

                <option
                  key={m.id}
                  value={m.id}
                >
                  {m.nombre}
                </option>

              ))}

            </select>

          </div>


          {/* CONSULTORIO */}
          <div className="col-md-4 mb-3">

            <select
              className="form-control"
              name="consultorio_id"
              value={form.consultorio_id}
              onChange={handleChange}
            >

              <option value="">
                Seleccione consultorio
              </option>

              {consultorios.map((c) => (

                <option
                  key={c.id}
                  value={c.id}
                >
                  {c.numero}
                </option>

              ))}

            </select>

          </div>


          {/* FECHA */}
          <div className="col-md-4 mb-3">

            <input
              type="date"
              className="form-control"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
            />

          </div>


          {/* HORA */}
          <div className="col-md-4 mb-3">

            <input
              type="time"
              className="form-control"
              name="hora"
              value={form.hora}
              onChange={handleChange}
            />

          </div>


          {/* ESTADO */}
          <div className="col-md-4 mb-3">

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
          {editando ? "Actualizar" : "Guardar"}
        </button>

      </form>


      {/* TABLA */}
      <div className="card shadow">

        <div className="card-body">

          <table className="table table-striped">

            <thead className="table-dark">

              <tr>

                <th>Paciente</th>
                <th>Médico</th>
                <th>Consultorio</th>

                <th>Fecha</th>
                <th>Hora</th>

                <th>Estado</th>

                <th>Acciones</th>

              </tr>

            </thead>


            <tbody>

              {citas.map((c) => (

                <tr key={c.id}>

                  <td>{c.paciente}</td>
                  <td>{c.medico}</td>
                  <td>{c.consultorio}</td>

                  <td>{c.fecha}</td>
                  <td>{c.hora}</td>

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