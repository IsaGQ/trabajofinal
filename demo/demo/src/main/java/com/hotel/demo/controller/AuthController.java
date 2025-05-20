package com.hotel.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hotel.demo.model.Usuario;
import com.hotel.demo.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Para permitir conexión desde React
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/register")
    public String register(@RequestBody Usuario newUser) {
        Usuario existingUser = usuarioRepository.findByUsername(newUser.getUsername());

        if (existingUser != null) {
            return "El usuario ya existe";
        }

        usuarioRepository.save(newUser);
        return "Usuario registrado exitosamente";
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario loginRequest) {
        Usuario usuario = usuarioRepository.findByUsername(loginRequest.getUsername());

        if (usuario != null && usuario.getPassword().equals(loginRequest.getPassword())) {
            return "Login exitoso";
        } else {
            return "Usuario o contraseña incorrectos";
        }
    }
}
