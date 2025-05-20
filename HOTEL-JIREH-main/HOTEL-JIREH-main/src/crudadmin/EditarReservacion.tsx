import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Habitacion {
  id: number;
  tipo: string;
  precioPorNoche: number;
}

interface Reservacion {
  nombreCompleto: string;
  correo: string;
  fechaLlegada: string;
  fechaSalida: string;
  precioTotal: number;
  habitaciones: Habitacion[];
}

const EditarReservacion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState<Habitacion[]>([]);
  const [reservacion, setReservacion] = useState<Reservacion>({
    nombreCompleto: "",
    correo: "",
    fechaLlegada: "",
    fechaSalida: "",
    precioTotal: 0,
    habitaciones: []
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resReservacion, resHabitaciones] = await Promise.all([
          axios.get<Reservacion>(`http://localhost:8080/api/reservas/${id}`),
          axios.get<Habitacion[]>("http://localhost:8080/api/habitaciones")
        ]);
        setReservacion(resReservacion.data);
        setHabitacionesDisponibles(resHabitaciones.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    if (id) {
      cargarDatos();
    }
  }, [id]);

  const calcularPrecioTotal = (habitacion: Habitacion): number => {
    const fechaInicio = new Date(reservacion.fechaLlegada);
    const fechaFin = new Date(reservacion.fechaSalida);
    const diferenciaDias = (fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24);
    if (habitacion && !isNaN(diferenciaDias) && diferenciaDias > 0) {
      return diferenciaDias * habitacion.precioPorNoche;
    }
    return 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nuevaReservacion = { ...reservacion, [name]: value };

    if (name === "fechaLlegada" || name === "fechaSalida") {
      const habitacionActual = reservacion.habitaciones[0];
      if (habitacionActual) {
        nuevaReservacion.precioTotal = calcularPrecioTotal(habitacionActual);
      }
    }

    setReservacion(nuevaReservacion);
  };

  const handleHabitacionSeleccionada = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idHabitacion = parseInt(e.target.value);
    const habitacion = habitacionesDisponibles.find(h => h.id === idHabitacion);
    if (habitacion) {
      const precioNuevo = calcularPrecioTotal(habitacion);
      setReservacion({
        ...reservacion,
        habitaciones: [habitacion],
        precioTotal: precioNuevo
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!id) return;
      await axios.put(`http://localhost:8080/api/reservas/${id}`, reservacion);
      alert("Reservación actualizada con éxito");
      navigate("/admin/reservaciones");
    } catch (error) {
      console.error("Error al actualizar la reservación:", error);
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-eco-dark-green text-center">Editar Reservación</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="nombreCompleto" className="block mb-1 font-medium text-gray-700">Nombre completo</label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              value={reservacion.nombreCompleto}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label htmlFor="correo" className="block mb-1 font-medium text-gray-700">Correo</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={reservacion.correo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label htmlFor="fechaLlegada" className="block mb-1 font-medium text-gray-700">Fecha de llegada</label>
            <input
              type="date"
              id="fechaLlegada"
              name="fechaLlegada"
              value={reservacion.fechaLlegada}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label htmlFor="fechaSalida" className="block mb-1 font-medium text-gray-700">Fecha de salida</label>
            <input
              type="date"
              id="fechaSalida"
              name="fechaSalida"
              value={reservacion.fechaSalida}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label htmlFor="habitacion" className="block mb-1 font-medium text-gray-700">Seleccionar habitación</label>
            <select
              id="habitacion"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              onChange={handleHabitacionSeleccionada}
              required
              value={reservacion.habitaciones[0]?.id || ""}
            >
              <option value="">Seleccionar habitación</option>
              {habitacionesDisponibles.map(h => (
                <option key={h.id} value={h.id}>
                  {h.tipo} - ${h.precioPorNoche} por noche
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="precioTotal" className="block mb-1 font-medium text-gray-700">Precio total</label>
            <input
              type="number"
              id="precioTotal"
              name="precioTotal"
              value={reservacion.precioTotal}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

           <button
            type="submit"
            className="w-full bg-eco-dark-green text-white py-2 rounded-md font-semibold hover:bg-eco-cream hover:text-eco-dark-green transition-colors"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarReservacion;
