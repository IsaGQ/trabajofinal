import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerHabitaciones, eliminarHabitacion } from "../services/HabitaciService";

const HabitacionesList = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const cargarHabitaciones = async () => {
    try {
      const res = await obtenerHabitaciones();
      setHabitaciones(res.data);
    } catch (error) {
      console.error("Error al cargar habitaciones:", error);
    }
  };

  const borrarHabitacion = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar esta habitación?"
    );

    if (confirmar) {
      try {
        await eliminarHabitacion(id);
        cargarHabitaciones();
        alert("La habitación se eliminó con éxito ya que no está asociada a ninguna reserva.");
      } catch (error) {
        if (error.response && error.response.status === 500) {
          alert("No se puede eliminar: la habitación está asociada a una o más reservas.");
        } else {
          alert("Error al eliminar la habitación. Intenta nuevamente.");
        }
      }
    }
  };

  const editarHabitacion = (id) => {
    navigate(`/admin/editar-habitacion/${id}`);
  };

  const obtenerUrlImagen = (imagenUrl) => {
    if (!imagenUrl) return null;
    return imagenUrl.startsWith("http") ? imagenUrl : `http://localhost:8080${imagenUrl}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-eco-dark-green text-center">Lista de Habitaciones</h2>

      {habitaciones.length === 0 ? (
        <p className="text-center text-gray-600">No hay habitaciones registradas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {habitaciones.map((hab) => (
            <div key={hab.id} className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col">
              {hab.imagenUrl && (
                <img
                  src={obtenerUrlImagen(hab.imagenUrl)}
                  alt={`Imagen de ${hab.tipo}`}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-eco-dark-green capitalize">{hab.tipo}</h3>
                <p className="text-gray-700 mb-2">{hab.descripcion}</p>
                <p className="text-gray-800"><strong>Precio:</strong> ${hab.precioPorNoche} COP</p>
                <p className="text-gray-800"><strong>Capacidad:</strong> {hab.capacidad} personas</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => editarHabitacion(hab.id)}
                    className="bg-eco-dark-green text-white px-4 py-1 rounded-md hover:bg-eco-cream hover:text-eco-dark-green transition-colors text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => borrarHabitacion(hab.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-500 transition-colors text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitacionesList;
