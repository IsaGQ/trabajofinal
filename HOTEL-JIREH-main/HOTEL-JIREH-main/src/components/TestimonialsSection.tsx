
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const testimonials = [
  {
    quote: "Una experiencia increíble en medio de la naturaleza. Las habitaciones son hermosas y el personal muy atento.",
    author: "María González",
    location: "Madrid, España"
  },
  {
    quote: "El lugar perfecto para desconectar. Las actividades ecológicas fueron muy educativas y divertidas.",
    author: "Carlos Rodríguez",
    location: "Buenos Aires, Argentina"
  },
  {
    quote: "La comida orgánica es exquisita y las instalaciones respetuosas con el medio ambiente. Volveremos seguro.",
    author: "Ana López",
    location: "Ciudad de México, México"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-eco-dark-green text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-playfair">
          Lo que Dicen Nuestros Huéspedes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-eco-light-green bg-opacity-20 border-none">
              <CardContent className="p-6 pt-8">
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm opacity-75">{testimonial.location}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
