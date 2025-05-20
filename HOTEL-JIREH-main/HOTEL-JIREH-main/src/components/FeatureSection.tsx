
import React from 'react';
import { Leaf, Hotel, Trees, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-eco-dark-green" />,
    title: "Sostenibilidad",
    description: "Comprometidos con prácticas ecológicas, desde energía solar hasta reciclaje y reutilización."
  },
  {
    icon: <Hotel className="h-8 w-8 text-eco-dark-green" />,
    title: "Confort Natural",
    description: "Habitaciones diseñadas para brindar comodidad mientras te conectas con la naturaleza."
  },
  {
    icon: <Trees className="h-8 w-8 text-eco-dark-green" />,
    title: "Entorno Natural",
    description: "Ubicado en medio de un bosque prístino, con senderos para explorar la flora y fauna local."
  },
  {
    icon: <Calendar className="h-8 w-8 text-eco-dark-green" />,
    title: "Experiencias Únicas",
    description: "Actividades guiadas por expertos locales para descubrir los secretos de nuestro ecosistema."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-eco-cream">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-eco-dark-green text-center mb-12 font-playfair">
          ¿Por qué elegirnos?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-eco-light-green bg-opacity-20 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-eco-dark-green">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
