package com.hotel.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.demo.model.habitacion;

public interface habitacionrespository extends JpaRepository<habitacion, Long> {
}
