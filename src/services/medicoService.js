import axios from "axios";

const API = "http://localhost:3000/api/medicos";

export const getMedicos = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const crearMedico = async (medico) => {
  const response = await axios.post(API, medico);
  return response.data;
};

export const actualizarMedico = async (id, medico) => {
  const response = await axios.put(
    `${API}/${id}`,
    medico
  );

  return response.data;
};

export const eliminarMedico = async (id) => {
  const response = await axios.delete(
    `${API}/${id}`
  );

  return response.data;
};