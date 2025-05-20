import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { crearHabitacion } from "@/services/HabitaciService";

interface Habitacion {
  tipo: string;
  descripcion: string;
  precioPorNoche: string;
  capacidad: string;
  imagenUrl: string;
}

const CrearHabitacion: React.FC = () => {
  const [habitacion, setHabitacion] = useState<Habitacion>({
    tipo: "",
    descripcion: "",
    precioPorNoche: "",
    capacidad: "",
    imagenUrl: "",
  });

  const [imagenFile, setImagenFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHabitacion({ ...habitacion, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImagenFile(file || null);
  };

  const subirImagen = async (): Promise<string> => {
    if (!imagenFile) return "";
    const formData = new FormData();
    formData.append("file", imagenFile);

    try {
      const response = await axios.post<string>("http://localhost:8080/api/habitaciones/upload", formData);
      return response.data;
    } catch (error) {
      console.error("Error al subir imagen:", error);
      return "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imagenUrlSubida = await subirImagen();

    const habitacionConImagen: Habitacion = {
      ...habitacion,
      imagenUrl: imagenUrlSubida,
    };

    try {
      await crearHabitacion(habitacionConImagen);
      alert("Habitación creada con éxito");
      setHabitacion({ tipo: "", descripcion: "", precioPorNoche: "", capacidad: "", imagenUrl: "" });
      setImagenFile(null);
    } catch (error) {
      console.error("Error al crear habitación:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-eco-dark-green text-center">Crear Habitación</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <input
              type="text"
              name="tipo"
              value={habitacion.tipo}
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
              value={habitacion.descripcion}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio por noche</label>
            <input
              type="number"
              name="precioPorNoche"
              value={habitacion.precioPorNoche}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
            <input
              type="number"
              name="capacidad"
              value={habitacion.capacidad}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-dark-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen (archivo)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-eco-dark-green file:text-white hover:file:bg-eco-cream"
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

export default CrearHabitacion;
