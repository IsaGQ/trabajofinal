import React, { useState, ChangeEvent, FormEvent } from "react";
import { crearServicio } from "../services/ServiciosService";

const CrearServicios: React.FC = () => {
  const [servicio, setServicio] = useState({
    nombre: "",
    descripcion: "",
    imagenUrl: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await crearServicio(servicio);
      alert("Servicio creado con éxito");
      setServicio({ nombre: "", descripcion: "", imagenUrl: "" });
    } catch (error) {
      alert("Error al crear el servicio. Intenta nuevamente.");
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-eco-dark-green text-center">Crear Servicio</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={servicio.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={servicio.descripcion}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen (URL)</label>
            <input
              type="text"
              name="imagenUrl"
              value={servicio.imagenUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="bg-eco-dark-green text-white px-6 py-2 rounded-md hover:bg-eco-cream hover:text-eco-dark-green transition-colors"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearServicios;
