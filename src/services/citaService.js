import axios from "axios";

const API_URL = "http://localhost:3000/api/citas";


// OBTENER
export const getCitas = async () => {

  const response = await axios.get(API_URL);

  return response.data;

};


// CREAR
export const crearCita = async (data) => {

  const response = await axios.post(API_URL, data);

  return response.data;

};


// ELIMINAR
export const eliminarCita = async (id) => {

  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;

};


// ACTUALIZAR
export const actualizarCita = async (id, data) => {

  const response = await axios.put(

    `${API_URL}/${id}`,
    data

  );

  return response.data;

};