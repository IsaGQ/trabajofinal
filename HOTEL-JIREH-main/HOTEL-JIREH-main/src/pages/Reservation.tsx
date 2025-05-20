
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

const Reservation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: 'standard',
    guests: 1,
    specialRequests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to the server
    toast({
      title: "Reservación enviada",
      description: "Nos pondremos en contacto contigo pronto para confirmar tu reserva.",
    });
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-8 bg-eco-light-green bg-opacity-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-eco-dark-green text-center mb-4 font-playfair">
            Reserva tu Estadía
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Completa el formulario a continuación para reservar tu experiencia en nuestro eco lodge. Te contactaremos para confirmar tu reserva.
          </p>
        </div>
      </div>
      
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-eco-medium-green">
            <CardHeader>
              <CardTitle className="text-eco-dark-green">Formulario de Reserva</CardTitle>
              <CardDescription>Todos los campos marcados con * son obligatorios.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombre completo *</Label>
                    <Input 
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="roomType">Tipo de habitación *</Label>
                    <select
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      required
                    >
                      <option value="standard">Estándar - Vista al Bosque</option>
                      <option value="superior">Superior - Vista a la Montaña</option>
                      <option value="deluxe">Deluxe - Cerca del Río</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Fecha de llegada *</Label>
                    <Input 
                      id="checkIn"
                      name="checkIn"
                      type="date"
                      value={formData.checkIn}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Fecha de salida *</Label>
                    <Input 
                      id="checkOut"
                      name="checkOut"
                      type="date"
                      value={formData.checkOut}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="guests">Número de huéspedes *</Label>
                    <Input 
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Peticiones especiales</Label>
                  <Textarea 
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="min-h-[120px]"
                    placeholder="Alergias, preferencias dietéticas, solicitudes específicas..."
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full bg-eco-dark-green hover:bg-eco-medium-green text-white">
                    Enviar Solicitud de Reserva
                  </Button>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    Al enviar este formulario, aceptas nuestra política de privacidad y términos de servicio. Te enviaremos un correo electrónico de confirmación una vez procesada tu solicitud.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-12 bg-eco-cream p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-eco-dark-green mb-4">Información sobre Reservas</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Horario de check-in: 15:00 hrs / Check-out: 12:00 hrs.</li>
              <li>Se requiere un depósito del 30% para confirmar la reserva.</li>
              <li>Cancelación gratuita hasta 48 horas antes de la fecha de llegada.</li>
              <li>Para grupos de más de 8 personas, contactar directamente por email.</li>
              <li>Si necesitas asistencia con tu reserva, llámanos al +123 456 7890.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Reservation;
