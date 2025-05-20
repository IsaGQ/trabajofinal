import axios from "axios";

// Definición de tipo para habitación
export interface Habitacion {
  tipo: string;
  descripcion: string;
  precioPorNoche: string | number;
  capacidad: string | number;
  imagenUrl: string;
}

// URL base API Habitaciones
const API_URL = "http://localhost:8080/api/habitaciones";

// Obtener todas las habitaciones
export const obtenerHabitaciones = () => axios.get<Habitacion[]>(API_URL);

// Obtener una habitación por ID
export const obtenerHabitacion = async (id: string | number): Promise<Habitacion> => {
  const res = await axios.get<Habitacion>(`${API_URL}/${id}`);
  return res.data; // ✅ devuelve solo data
};


// Crear una nueva habitación
export const crearHabitacion = (habitacion: Habitacion) =>
  axios.post(API_URL, habitacion);

// Actualizar una habitación existente
export const actualizarHabitacion = (id: string | number, habitacion: Habitacion) =>
  axios.put(`${API_URL}/${id}`, habitacion);

// Eliminar una habitación
export const eliminarHabitacion = (id: string | number) =>
  axios.delete(`${API_URL}/${id}`);
