package com.hotel.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.demo.model.cliente;

public interface clienterepository extends JpaRepository<cliente, Long> {
}

