import axios from "axios";

const API = "http://localhost:3000/api/pacientes";

// Obtener pacientes
export const getPacientes = async () => {
  const response = await axios.get(API);
  return response.data;
};

// Crear paciente
export const crearPaciente = async (paciente) => {
  const response = await axios.post(API, paciente);
  return response.data;
};

// Actualizar paciente
export const actualizarPaciente = async (id, paciente) => {
  const response = await axios.put(
    `${API}/${id}`,
    paciente
  );

  return response.data;
};

// Eliminar paciente
export const eliminarPaciente = async (id) => {
  const response = await axios.delete(
    `${API}/${id}`
  );

  return response.data;
};