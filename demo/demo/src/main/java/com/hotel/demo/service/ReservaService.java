package com.hotel.demo.service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.demo.model.Habitacion;
import com.hotel.demo.model.Reservacion;
import com.hotel.demo.repository.HabitacionRespository;
import com.hotel.demo.repository.ReservaRepository;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private HabitacionRespository habitacionRepository;

    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    // Obtener todas las reservas
    public List<Reservacion> obtenerTodas() {
        return reservaRepository.findAll();
    }

    // Obtener una reserva por ID
    public Reservacion obtenerPorId(Long id) {
        Optional<Reservacion> reserva = reservaRepository.findById(id);
        return reserva.orElse(null);
    }

    public Reservacion crearReserva(Reservacion reserva) {
        List<Habitacion> habitacionesCompletas = new ArrayList<>();
        double total = 0;

        for (Habitacion h : reserva.getHabitaciones()) {
            Habitacion habBD = habitacionRepository.findById(h.getId())
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
    public Reservacion actualizarReserva(Long id, Reservacion reservaActualizada) {
        Reservacion reservaExistente = reservaRepository.findById(id).orElse(null);
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
        List<Habitacion> habitacionesActualizadas = new ArrayList<>();
        for (Habitacion h : reservaActualizada.getHabitaciones()) {
            habitacionRepository.findById(h.getId()).ifPresent(habitacionesActualizadas::add);
        }
        reservaExistente.setHabitaciones(habitacionesActualizadas);

        // Calcular el precio total (días * precio por noche)
        long dias = ChronoUnit.DAYS.between(
                reservaExistente.getFechaLlegada(),
                reservaExistente.getFechaSalida());

        double total = 0.0;
        for (Habitacion h : habitacionesActualizadas) {
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