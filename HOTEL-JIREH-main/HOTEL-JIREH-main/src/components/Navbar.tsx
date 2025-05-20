import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Login exitoso');
        window.open('/admin', '_blank');
        setFormVisible(false);
      } else {
        alert('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-4 py-2 md:py-4 md:px-8">
      <div className="flex items-center justify-between relative">

        {/* Logo */}
        <Link to="/" className="text-white flex items-center">
          <span className="text-xl md:text-2xl font-bold font-playfair tracking-wider">JIREH</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          <Link to="/" className="text-white hover:text-eco-cream transition-colors">Inicio</Link>
          <Link to="/habitaciones" className="text-white hover:text-eco-cream transition-colors">Habitaciones</Link>
          <Link to="/servicios" className="text-white hover:text-eco-cream transition-colors">Servicios</Link>
          <Link to="/reserva">
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-eco-dark-green">
              Reservar Ahora
            </Button>
          </Link>
        </div>

        {/* Right Controls (Menu + Login) */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User Icon */}
          <button
            className="text-white"
            onClick={() => setFormVisible(!formVisible)}
            title="Iniciar sesión"
          >
            <User size={24} />
          </button>
        </div>

        {/* Login Form */}
        {formVisible && (
          <div className="absolute top-full right-0 mt-2 bg-green-100 text-black p-4 rounded shadow-lg w-72 z-50 border border-green-300">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-2 px-2 py-1 border rounded border-green-300"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-2 px-2 py-1 border rounded border-green-300"
            />
            <a href="#" className="text-sm text-green-700 block mb-2 hover:underline">¿Olvidaste tu contraseña?</a>
            <button
              onClick={handleLogin}
              className="w-full bg-green-500 text-white py-1 rounded hover:bg-green-600"
            >
              Ingresar
            </button>
          </div>
        )}

      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-eco-dark-green bg-opacity-95 absolute top-full left-0 w-full py-4 px-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-white hover:text-eco-cream transition-colors" onClick={() => setIsOpen(false)}>Inicio</Link>
            <Link to="/habitaciones" className="text-white hover:text-eco-cream transition-colors" onClick={() => setIsOpen(false)}>Habitaciones</Link>
            <Link to="/servicios" className="text-white hover:text-eco-cream transition-colors" onClick={() => setIsOpen(false)}>Servicios</Link>
            <Link to="/galeria" className="text-white hover:text-eco-cream transition-colors" onClick={() => setIsOpen(false)}>Galería</Link>
            <Link to="/contacto" className="text-white hover:text-eco-cream transition-colors" onClick={() => setIsOpen(false)}>Contacto</Link>
            <Link to="/reserva" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-eco-dark-green w-full">
                Reservar Ahora
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
