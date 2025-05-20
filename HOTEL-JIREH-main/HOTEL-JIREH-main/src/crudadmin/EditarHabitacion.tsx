import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerHabitacion, actualizarHabitacion } from "../services/HabitaciService";
import axios from "axios";

const EditarHabitacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [habitacion, setHabitacion] = useState({
    tipo: "",
    descripcion: "",
    precioPorNoche: "",
    capacidad: "",
    imagenUrl: ""
  });

  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    const cargarHabitacion = async () => {
      try {
        const res = await obtenerHabitacion(id);
        setHabitacion(res); // usa res directamente
      } catch (error) {
        console.error("Error al cargar la habitación:", error);
      }
    };

    cargarHabitacion();
  }, [id]);

  const handleChange = (e) => {
    setHabitacion({ ...habitacion, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const subirImagen = async () => {
    if (!imagenFile) return habitacion.imagenUrl; // No cambia la imagen si no hay archivo

    const formData = new FormData();
    formData.append("file", imagenFile);

    try {
      const response = await axios.post("http://localhost:8080/api/habitaciones/upload", formData);
      return response.data; // ruta de imagen subida
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return habitacion.imagenUrl;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imagenUrlSubida = await subirImagen();

    const habitacionActualizada = {
      ...habitacion,
      imagenUrl: imagenUrlSubida
    };

    try {
      await actualizarHabitacion(id, habitacionActualizada);
      alert("Habitación actualizada con éxito");
      navigate("/admin/habitaciones");
    } catch (error) {
      console.error("Error al actualizar la habitación:", error);
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-eco-dark-green text-center">Editar Habitación</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Tipo</label>
            <input
              type="text"
              name="tipo"
              value={habitacion.tipo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={habitacion.descripcion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Precio por noche</label>
            <input
              type="number"
              name="precioPorNoche"
              value={habitacion.precioPorNoche}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Capacidad</label>
            <input
              type="number"
              name="capacidad"
              value={habitacion.capacidad}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Imagen actual</label>
            {habitacion.imagenUrl && (
              <img
                src={`http://localhost:8080${habitacion.imagenUrl}`}
                alt="Imagen actual"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <label className="block mb-1 font-medium text-gray-700">Cambiar imagen (opcional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-eco-dark-green file:text-white hover:file:bg-eco-cream hover:file:text-eco-dark-green cursor-pointer rounded-md"
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

export default EditarHabitacion;
