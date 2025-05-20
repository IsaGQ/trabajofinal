
import React from 'react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-eco-dark-green mb-4 font-playfair">
              Nuestro Compromiso con la Naturaleza
            </h2>
            <p className="text-gray-700 mb-6">
              En Eco Lodge, creemos que el lujo y la sostenibilidad pueden ir de la mano. Nuestro lodge ha sido diseñado con materiales locales y técnicas de construcción sostenible para minimizar nuestro impacto ambiental.
            </p>
            <p className="text-gray-700 mb-6">
              Trabajamos con las comunidades locales y promovemos prácticas que respetan y preservan los ecosistemas naturales. Desde nuestra cocina orgánica hasta nuestras actividades de ecoturismo, cada aspecto de tu estancia está diseñado para ser sostenible.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-eco-dark-green hover:bg-eco-medium-green text-white">
                Conoce Más
              </Button>
              <Button variant="outline" className="border-eco-dark-green text-eco-dark-green hover:bg-eco-dark-green hover:text-white">
                Nuestras Habitaciones
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
                alt="Interior del Eco Lodge" 
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9" 
                  alt="Detalles naturales del lodge" 
                  className="rounded-lg shadow-xl w-48 h-48 object-cover border-4 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
