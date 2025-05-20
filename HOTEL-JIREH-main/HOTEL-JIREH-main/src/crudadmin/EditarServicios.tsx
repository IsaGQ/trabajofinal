import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerServicio, actualizarServicio } from "../services/ServiciosService";

const EditarServicios = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [servicio, setServicio] = useState({
    nombre: "",
    descripcion: "",
    imagenUrl: ""
  });

  useEffect(() => {
    const cargarServicio = async () => {
      try {
        const res = await obtenerServicio(id);
        setServicio(res.data);
      } catch (error) {
        console.error("Error al cargar el servicio:", error);
      }
    };

    if (id) cargarServicio();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServicio((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!id) return;
      await actualizarServicio(id, servicio);
      alert("Servicio actualizado con éxito");
      navigate("/admin/servicios");
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 flex justify-center px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-eco-dark-green mb-6 text-center">
          Editar Servicio
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block mb-2 font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={servicio.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block mb-2 font-medium text-gray-700">
              Descripción
            </label>
            <input
              id="descripcion"
              name="descripcion"
              type="text"
              value={servicio.descripcion}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div>
            <label htmlFor="imagenUrl" className="block mb-2 font-medium text-gray-700">
              Imagen (URL)
            </label>
            <input
              id="imagenUrl"
              name="imagenUrl"
              type="text"
              value={servicio.imagenUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
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

export default EditarServicios;
