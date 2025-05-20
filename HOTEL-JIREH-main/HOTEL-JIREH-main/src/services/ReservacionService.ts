import axios from "axios";

// URL base API Reservas
const API_URL = "http://localhost:8080/api/reservas";

// Obtener todas las reservaciones
export const obtenerReservas = () => axios.get(API_URL);

// Obtener una reservación por ID
export const obtenerReserva = (id: string | number) =>
  axios.get(`${API_URL}/${id}`);

// Crear una nueva reservación
export const crearReserva = (reserva: any) => axios.post(API_URL, reserva);

// Actualizar una reservación existente
export const actualizarReserva = (id: string | number, reserva: any) =>
  axios.put(`${API_URL}/${id}`, reserva);

// Eliminar una reservación
export const eliminarReserva = (id: string | number) =>
  axios.delete(`${API_URL}/${id}`);
