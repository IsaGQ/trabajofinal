package com.hotel.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.demo.model.Habitacion;

public interface HabitacionRespository extends JpaRepository<Habitacion, Long> {
}
