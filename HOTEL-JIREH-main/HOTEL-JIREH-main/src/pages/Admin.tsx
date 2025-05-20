import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import HabitacionesList from '../crudadmin/HabitacionesList';
import CrearHabitacion from '../crudadmin/CrearHabitacion';
import EditarHabitacion from '../crudadmin/EditarHabitacion';

import ReservacionList from '../crudadmin/ReservacionList';
import CrearReservacion from '../crudadmin/CrearReservacion';
import EditarReservacion from '../crudadmin/EditarReservacion';

import ServiciosList from '../crudadmin/ServiciosList'; 
import CrearServicios from '../crudadmin/CrearServicios';
import EditarServicios from '../crudadmin/EditarServicios';

function Admin() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar verde */}
      <aside className="w-64 bg-green-700 text-white p-6">
        {/* Logo con enlace a la página principal */}
        <Link to="/" className="text-2xl font-bold mb-8 block hover:text-gray-200 transition">
          Hotel Jireh
        </Link>

        <nav className="space-y-4">
          <Link to="/admin/habitaciones" className="block hover:bg-green-800 p-2 rounded">Lista Habitaciones</Link>
          <Link to="/admin/crear-habitacion" className="block hover:bg-green-800 p-2 rounded">Crear Habitación</Link>
          <Link to="/admin/reservaciones" className="block hover:bg-green-800 p-2 rounded">Lista Reservaciones</Link>
          <Link to="/admin/crear-reservacion" className="block hover:bg-green-800 p-2 rounded">Crear Reservación</Link>
          <Link to="/admin/servicios" className="block hover:bg-green-800 p-2 rounded">Lista Servicios</Link>
          <Link to="/admin/crear-servicio" className="block hover:bg-green-800 p-2 rounded">Crear Servicio</Link>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-gray-100">
        <Routes>
          {/* Habitaciones */}
          <Route path="habitaciones" element={<HabitacionesList />} />
          <Route path="crear-habitacion" element={<CrearHabitacion />} />
          <Route path="editar-habitacion/:id" element={<EditarHabitacion />} />

          {/* Reservaciones */}
          <Route path="reservaciones" element={<ReservacionList />} />
          <Route path="crear-reservacion" element={<CrearReservacion />} />
          <Route path="editar-reservacion/:id" element={<EditarReservacion />} />

          {/* Servicios */}
          <Route path="servicios" element={<ServiciosList />} />
          <Route path="crear-servicio" element={<CrearServicios />} />
          <Route path="editar-servicio/:id" element={<EditarServicios />} />
        </Routes>
      </main>
    </div>
  );
}

export default Admin;

