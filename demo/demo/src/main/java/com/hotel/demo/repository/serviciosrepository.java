package com.hotel.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hotel.demo.model.Servicios;

public interface ServiciosRepository extends JpaRepository<Servicios, Long> {
}

