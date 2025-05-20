import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerServicios, eliminarServicio } from "../services/ServiciosService";

const ServiciosList = () => {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      const res = await obtenerServicios();
      setServicios(res.data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
    }
  };

  const borrarServicio = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este servicio?");
    if (!confirmar) return;

    try {
      await eliminarServicio(id);
      cargarServicios();
      alert("Servicio eliminado correctamente.");
    } catch (error) {
      alert("Error al eliminar el servicio. Intenta nuevamente.");
      console.error("Error al eliminar servicio:", error);
    }
  };

  const editarServicio = (id) => {
    navigate(`/admin/editar-servicio/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-eco-dark-green text-center">Lista de Servicios</h2>

      {servicios.length === 0 ? (
        <p className="text-center text-gray-600">No hay servicios registrados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {servicios.map((serv) => (
            <div key={serv.id} className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col">
              {serv.imagenUrl && (
                <img
                  src={serv.imagenUrl.startsWith("http") ? serv.imagenUrl : `http://localhost:8080${serv.imagenUrl}`}
                  alt={`Imagen de ${serv.nombre}`}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-eco-dark-green capitalize">{serv.nombre}</h3>
                <p className="text-gray-700 mb-4">{serv.descripcion}</p>
                <div className="flex justify-between mt-auto">
                  <button
                    onClick={() => editarServicio(serv.id)}
                    className="bg-eco-dark-green text-white px-4 py-1 rounded-md hover:bg-eco-cream hover:text-eco-dark-green transition-colors text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => borrarServicio(serv.id)}
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

export default ServiciosList;

