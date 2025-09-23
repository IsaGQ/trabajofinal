import { Navigate, useLocation, useNavigate } from "react-router-dom";
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

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth");
        if (!token) return;

        const response = await fetch(
          "http://localhost:8080/api/auth/isAuthenticated/" + token,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    checkAuth();
    setLoading(false);
  }, [navigate]); // se ejecuta solo al montar

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login exitoso:", data);
        localStorage.setItem("auth", data.token);
      } else {
        console.error("Error en el login:", response.status);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

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

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-eco-dark-green hover:bg-eco-medium-green text-white"
                    >
                      Ingresar
                    </Button>

                    <p className="text-sm text-gray-500 mt-4">
                      Al enviar este formulario, aceptas nuestra política de
                      privacidad y términos de servicio.
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

export default Login;
