package com.hotel.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hotel.demo.model.Servicios;
import com.hotel.demo.repository.ServiciosRepository;

@Service
public class ServicioService {

    private final ServiciosRepository servicioRepository;

    public ServicioService(ServiciosRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public List<Servicios> listarServicios() {
        return servicioRepository.findAll();
    }

    public Servicios guardarServicio(Servicios servicio) {
        return servicioRepository.save(servicio);
    }

    public Optional<Servicios> obtenerServicioPorId(Long id) {
        return servicioRepository.findById(id);
    }

    public void eliminarServicio(Long id) {
        servicioRepository.deleteById(id);
    }

    public Servicios actualizarServicio(Long id, Servicios servicioActualizado) {
        return servicioRepository.findById(id).map(servicio -> {
            servicio.setNombre(servicioActualizado.getNombre());
            servicio.setDescripcion(servicioActualizado.getDescripcion());
            servicio.setImagenUrl(servicioActualizado.getImagenUrl());
            return servicioRepository.save(servicio);
        }).orElseThrow(() -> new RuntimeException("Servicio no encontrado con ID: " + id));
    }
}

