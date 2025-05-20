import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { obtenerHabitaciones } from '../services/HabitaciService';

const RoomPreview = () => {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    const cargarHabitaciones = async () => {
      try {
        const res = await obtenerHabitaciones();
        setHabitaciones(res.data);
      } catch (error) {
        console.error('Error al cargar habitaciones:', error);
      }
    };

    cargarHabitaciones();
  }, []);

  const obtenerUrlImagen = (imagenUrl) => {
    if (!imagenUrl) return null;
    return imagenUrl.startsWith('http') ? imagenUrl : `http://localhost:8080${imagenUrl}`;
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-eco-medium-green bg-opacity-10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-eco-dark-green mb-4 font-playfair">
            Nuestras Habitaciones
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Diseñadas para brindar confort mientras te mantienes conectado con la belleza natural de nuestro entorno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {habitaciones.map((hab, index) => (
            <Card
              key={index}
              className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={obtenerUrlImagen(hab.imagenUrl)}
                  alt={hab.tipo}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-eco-dark-green text-lg">{hab.tipo}</CardTitle>
                <CardDescription>{hab.descripcion}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-eco-dark-green">${hab.precioPorNoche}</span>
                  <span className="text-gray-500 ml-1">/noche</span>
                </div>
                <Button className="bg-eco-dark-green hover:bg-eco-medium-green text-white">
                  Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-eco-dark-green text-eco-dark-green hover:bg-eco-dark-green hover:text-white"
          >
            Ver Todas las Habitaciones
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoomPreview;
