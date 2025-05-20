import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Habitacion {
  id: number;
  tipo: string;
  precioPorNoche?: number;
}

interface Reservacion {
  id: number;
  nombreCompleto: string;
  correo: string;
  fechaLlegada: string;
  fechaSalida: string;
  precioTotal: number;
  habitaciones: Habitacion[];
}

const ReservacionList: React.FC = () => {
  const [reservaciones, setReservaciones] = useState<Reservacion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarReservaciones();
  }, []);

  const cargarReservaciones = async () => {
    try {
      const res = await axios.get<Reservacion[]>("http://localhost:8080/api/reservas");
      setReservaciones(res.data);
    } catch (error) {
      console.error("Error al obtener las reservaciones:", error);
    }
  };

  const eliminarReservacion = async (id: number) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta reservación?");
    if (!confirmacion) return;

    try {
      await axios.delete(`http://localhost:8080/api/reservas/${id}`);
      setReservaciones(reservaciones.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error al eliminar la reservación:", error);
    }
  };

  const editarReservacion = (id: number) => {
    navigate(`/admin/editar-reservacion/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-eco-dark-green text-center">Lista de Reservaciones</h2>

      {reservaciones.length === 0 ? (
        <p className="text-center text-gray-600">No hay reservaciones registradas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reservaciones.map((r) => (
            <div key={r.id} className="bg-white shadow-md rounded-xl p-6 flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-2 text-eco-dark-green">{r.nombreCompleto}</h3>

              <p className="text-gray-700 mb-1"><strong>Correo:</strong> {r.correo}</p>
              <p className="text-gray-700 mb-1"><strong>Fecha de Llegada:</strong> {r.fechaLlegada}</p>
              <p className="text-gray-700 mb-1"><strong>Fecha de Salida:</strong> {r.fechaSalida}</p>
              <p className="text-gray-800 mb-3"><strong>Precio Total:</strong> ${r.precioTotal.toLocaleString("es-CO")} COP</p>

              <p className="text-gray-700 mb-4">
                <strong>Habitación:</strong>{" "}
                {r.habitaciones && r.habitaciones.length > 0
                  ? r.habitaciones.map((h, index) => (
                      <span key={h.id} className="capitalize">
                        {h.tipo}
                        {index < r.habitaciones.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : "No disponible"}
              </p>

              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => editarReservacion(r.id)}
                  className="bg-eco-dark-green text-white px-4 py-1 rounded-md hover:bg-eco-cream hover:text-eco-dark-green transition-colors text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarReservacion(r.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-500 transition-colors text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservacionList;
