package com.hotel.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.demo.model.Reservacion;

@Repository

public interface ReservaRepository extends JpaRepository<Reservacion, Long> {
    boolean existsByHabitaciones_Id(Long idHabitacion);
}
