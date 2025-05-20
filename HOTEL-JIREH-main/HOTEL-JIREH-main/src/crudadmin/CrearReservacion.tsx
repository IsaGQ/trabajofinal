import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Habitacion {
  id: number;
  tipo: string;
  precioPorNoche: number;
}

interface Reservacion {
  nombreCompleto: string;
  correo: string;
  direccion: string;
  celular: string;
  fechaLlegada: string;
  fechaSalida: string;
  habitaciones: Habitacion[];
  confirmada: boolean;
}

const CrearReservacion = () => {
  const [reservacion, setReservacion] = useState<Reservacion>({
    nombreCompleto: '',
    correo: '',
    direccion: '',
    celular: '',
    fechaLlegada: '',
    fechaSalida: '',
    habitaciones: [],
    confirmada: false
  });

  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState<Habitacion[]>([]);

  useEffect(() => {
    axios.get<Habitacion[]>('http://localhost:8080/api/habitaciones')
      .then(res => setHabitacionesDisponibles(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservacion({ ...reservacion, [e.target.name]: e.target.value });
  };

  const handleHabitacionSeleccionada = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    if (isNaN(id)) return;

    const habitacion = habitacionesDisponibles.find(h => h.id === id);
    if (habitacion) {
      setReservacion({ ...reservacion, habitaciones: [habitacion] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reservacion.habitaciones.length === 0) {
      alert("Debes seleccionar una habitación");
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/reservas', reservacion);
      alert("Reserva creada exitosamente");
      setReservacion({
        nombreCompleto: '',
        correo: '',
        direccion: '',
        celular: '',
        fechaLlegada: '',
        fechaSalida: '',
        habitaciones: [],
        confirmada: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-eco-dark-green text-center">Crear Reservación</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Nombre completo</label>
            <input
              type="text"
              name="nombreCompleto"
              value={reservacion.nombreCompleto}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Correo</label>
            <input
              type="email"
              name="correo"
              value={reservacion.correo}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={reservacion.direccion}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Celular</label>
            <input
              type="tel"
              name="celular"
              value={reservacion.celular}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Fecha de llegada</label>
            <input
              type="date"
              name="fechaLlegada"
              value={reservacion.fechaLlegada}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Fecha de salida</label>
            <input
              type="date"
              name="fechaSalida"
              value={reservacion.fechaSalida}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Seleccionar habitación</label>
            <select
              onChange={handleHabitacionSeleccionada}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Seleccionar habitación</option>
              {habitacionesDisponibles.map(h => (
                <option key={h.id} value={h.id}>
                  {h.tipo} - ${h.precioPorNoche} por noche
                </option>
              ))}
            </select>
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

export default CrearReservacion;
