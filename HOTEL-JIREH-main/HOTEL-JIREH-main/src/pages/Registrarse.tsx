import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Registrarse = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correo: "",
    direccion: "",
    celular: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registro exitoso:", data);
      } else {
        console.error("Error en el registro:", response.status);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-8 bg-eco-light-green bg-opacity-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-eco-dark-green text-center mb-4 font-playfair">
              Registrarse
            </h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
              Completa el formulario a continuación para poder continuar con tu
              reserva
            </p>
          </div>
        </div>

        <div className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-eco-medium-green">
              <CardHeader>
                <CardTitle className="text-eco-dark-green">
                  Formulario de registro
                </CardTitle>
                <CardDescription>
                  Todos los campos marcados con * son obligatorios.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre completo */}
                    <div className="space-y-2">
                      <Label htmlFor="nombreCompleto">Nombre completo *</Label>
                      <Input
                        id="nombreCompleto"
                        name="nombreCompleto"
                        value={formData.nombreCompleto}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Correo */}
                    <div className="space-y-2">
                      <Label htmlFor="correo">Email *</Label>
                      <Input
                        id="correo"
                        name="correo"
                        type="email"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Dirección */}
                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección *</Label>
                      <Input
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Celular */}
                    <div className="space-y-2">
                      <Label htmlFor="celular">Celular *</Label>
                      <Input
                        id="celular"
                        name="celular"
                        type="tel"
                        value={formData.celular}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                      <Label htmlFor="username">Usuario *</Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Elige tu nombre de usuario"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-eco-dark-green hover:bg-eco-medium-green text-white"
                    >
                      Registrarse
                    </Button>

                    <p className="text-sm text-gray-500 mt-4">
                      Al enviar este formulario, aceptas nuestra política de
                      privacidad y términos de servicio. Te enviaremos un correo
                      electrónico de confirmación una vez procesada tu
                      solicitud.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="mt-12 bg-eco-cream p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-eco-dark-green mb-4">
                Información sobre Reservas
              </h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>Horario de check-in: 15:00 hrs / Check-out: 12:00 hrs.</li>
                <li>
                  Se requiere un depósito del 30% para confirmar la reserva.
                </li>
                <li>
                  Cancelación gratuita hasta 48 horas antes de la fecha de
                  llegada.
                </li>
                <li>
                  Para grupos de más de 8 personas, contactar directamente por
                  email.
                </li>
                <li>
                  Si necesitas asistencia con tu reserva, llámanos al +123 456
                  7890.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Registrarse;
