import axios from "axios";

// URL base API Servicios
const API_URL = "http://localhost:8080/api/servicios";

// Obtener todos los servicios
export const obtenerServicios = () => axios.get(API_URL);

// Obtener un servicio por ID
export const obtenerServicio = (id: string | number) =>
  axios.get(`${API_URL}/${id}`);

// Crear un nuevo servicio
export const crearServicio = (servicio: any) => axios.post(API_URL, servicio);

// Actualizar un servicio existente
export const actualizarServicio = (id: string | number, servicio: any) =>
  axios.put(`${API_URL}/${id}`, servicio);

// Eliminar un servicio
export const eliminarServicio = (id: string | number) =>
  axios.delete(`${API_URL}/${id}`);


