package com.hotel.demo.service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.demo.model.habitacion;
import com.hotel.demo.model.reservacion;
import com.hotel.demo.repository.habitacionrespository;
import com.hotel.demo.repository.reservarepository;

@Service
public class reservasrvice {

    @Autowired
    private reservarepository reservaRepository;
    @Autowired
    private habitacionrespository habitacionRepository;

    public reservasrvice(reservarepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    // Obtener todas las reservas
    public List<reservacion> obtenerTodas() {
        return reservaRepository.findAll();
    }

    // Obtener una reserva por ID
    public reservacion obtenerPorId(Long id) {
        Optional<reservacion> reserva = reservaRepository.findById(id);
        return reserva.orElse(null);
    }

    public reservacion crearReserva(reservacion reserva) {
        List<habitacion> habitacionesCompletas = new ArrayList<>();
        double total = 0;

        for (habitacion h : reserva.getHabitaciones()) {
            habitacion habBD = habitacionRepository.findById(h.getId())
                    .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));
            habitacionesCompletas.add(habBD);

            long dias = ChronoUnit.DAYS.between(reserva.getFechaLlegada(), reserva.getFechaSalida());
            total += habBD.getPrecioPorNoche() * dias;
        }

        reserva.setHabitaciones(habitacionesCompletas);
        reserva.setPrecioTotal(total);

        return reservaRepository.save(reserva);
    }

    // Actualizar reserva
    public reservacion actualizarReserva(Long id, reservacion reservaActualizada) {
        reservacion reservaExistente = reservaRepository.findById(id).orElse(null);
        if (reservaExistente == null) {
            return null;
        }

        // Actualizar campos básicos
        reservaExistente.setNombreCompleto(reservaActualizada.getNombreCompleto());
        reservaExistente.setCorreo(reservaActualizada.getCorreo());
        reservaExistente.setDireccion(reservaActualizada.getDireccion());
        reservaExistente.setCelular(reservaActualizada.getCelular());
        reservaExistente.setFechaLlegada(reservaActualizada.getFechaLlegada());
        reservaExistente.setFechaSalida(reservaActualizada.getFechaSalida());
        reservaExistente.setConfirmada(reservaActualizada.isConfirmada());

        // Buscar habitaciones completas desde la base de datos
        List<habitacion> habitacionesActualizadas = new ArrayList<>();
        for (habitacion h : reservaActualizada.getHabitaciones()) {
            habitacionRepository.findById(h.getId()).ifPresent(habitacionesActualizadas::add);
        }
        reservaExistente.setHabitaciones(habitacionesActualizadas);

        // Calcular el precio total (días * precio por noche)
        long dias = ChronoUnit.DAYS.between(
                reservaExistente.getFechaLlegada(),
                reservaExistente.getFechaSalida());

        double total = 0.0;
        for (habitacion h : habitacionesActualizadas) {
            total += h.getPrecioPorNoche() * dias;
        }
        reservaExistente.setPrecioTotal(total);

        return reservaRepository.save(reservaExistente);
    }

    // Eliminar reserva
    public void eliminarReserva(Long id) {
        reservaRepository.deleteById(id);
    }

    public boolean tieneReservasPorHabitacion(Long idHabitacion) {
        return reservaRepository.existsByHabitaciones_Id(idHabitacion);
    }
    
}