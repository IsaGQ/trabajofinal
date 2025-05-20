package com.hotel.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.demo.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);
}

