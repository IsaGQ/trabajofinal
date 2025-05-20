package com.hotel.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hotel.demo.model.servicios;

public interface serviciosrepository extends JpaRepository<servicios, Long> {
}

