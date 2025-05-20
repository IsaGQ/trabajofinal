package com.hotel.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.demo.model.reservacion;

@Repository

public interface reservarepository extends JpaRepository<reservacion, Long> {
    boolean existsByHabitaciones_Id(Long idHabitacion);
}
