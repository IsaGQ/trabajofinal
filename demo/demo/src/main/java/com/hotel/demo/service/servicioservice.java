package com.hotel.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hotel.demo.model.servicios;
import com.hotel.demo.repository.serviciosrepository;

@Service
public class servicioservice {

    private final serviciosrepository servicioRepository;

    public servicioservice(serviciosrepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public List<servicios> listarServicios() {
        return servicioRepository.findAll();
    }

    public servicios guardarServicio(servicios servicio) {
        return servicioRepository.save(servicio);
    }

    public Optional<servicios> obtenerServicioPorId(Long id) {
        return servicioRepository.findById(id);
    }

    public void eliminarServicio(Long id) {
        servicioRepository.deleteById(id);
    }

    public servicios actualizarServicio(Long id, servicios servicioActualizado) {
        return servicioRepository.findById(id).map(servicio -> {
            servicio.setNombre(servicioActualizado.getNombre());
            servicio.setDescripcion(servicioActualizado.getDescripcion());
            servicio.setImagenUrl(servicioActualizado.getImagenUrl());
            return servicioRepository.save(servicio);
        }).orElseThrow(() -> new RuntimeException("Servicio no encontrado con ID: " + id));
    }
}

