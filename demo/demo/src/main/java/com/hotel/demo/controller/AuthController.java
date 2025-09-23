package com.hotel.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.hotel.demo.config.JwtUtil;
import com.hotel.demo.dto.RegisterForm;
import com.hotel.demo.model.Cliente;
import com.hotel.demo.model.Usuario;
import com.hotel.demo.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

import com.hotel.demo.repository.ClienteRepository;
import com.hotel.demo.dto.UsuarioDTO;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final JwtUtil jwtUtil = new JwtUtil();

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterForm registerForm) {
        Usuario existingUser = usuarioRepository.findByUsername(registerForm.getUsername());

        if (existingUser != null) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", 400);
            error.put("message", "El usuario ya existe");
            return ResponseEntity.badRequest().body(error);
        }

        Usuario usuario = new Usuario();
        usuario.setPassword(passwordEncoder.encode(registerForm.getPassword()));
        usuario.setUsername(registerForm.getUsername());
        System.out.println(registerForm.getUsername());

        Cliente cliente = new Cliente();
        cliente.setNombreCompleto(registerForm.getNombreCompleto());
        cliente.setCelular(registerForm.getCelular());
        cliente.setCorreo(registerForm.getCorreo());
        cliente.setDireccion(registerForm.getDireccion());
        cliente.setUsuario(usuario);

        usuarioRepository.save(usuario);
        clienteRepository.save(cliente);

        Map<String, Object> success = new HashMap<>();
        success.put("status", 201);
        success.put("message", "Usuario registrado correctamente");
        return ResponseEntity.status(HttpStatus.CREATED).body(success);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) {
        Usuario usuario = usuarioRepository.findByUsername(loginRequest.getUsername());

        if (usuario == null || !passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Credenciales incorrectas"));
        }

        String token = jwtUtil.generateToken(usuario.getUsername());
        UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.getId(), usuario.getUsername(), usuario.getUsername());

        return ResponseEntity.ok(Map.of(
                "message", "Acceso correcto",
                "token", token,
                "usuario", usuarioDTO
        ));
    }
}
