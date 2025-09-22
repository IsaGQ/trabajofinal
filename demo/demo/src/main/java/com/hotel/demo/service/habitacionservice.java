package com.hotel.demo.service;

import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.demo.model.Habitacion;
import com.hotel.demo.model.Reservacion;
import com.hotel.demo.repository.HabitacionRespository;
import com.hotel.demo.repository.ReservaRepository;

@Service
public class HabitacionService {

    @Autowired
    private HabitacionRespository habitacionRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    public List<Habitacion> obtenerTodasLasHabitaciones() {
        return habitacionRepository.findAll();
    }

    public Habitacion obtenerHabitacionPorId(Long id) {
        return habitacionRepository.findById(id).orElse(null);
    }

    public Habitacion crearHabitacion(Habitacion habitacion) {
        return habitacionRepository.save(habitacion);
    }

    public Habitacion actualizarHabitacion(Long id, Habitacion habitacionActualizada) {
        Habitacion habitacionExistente = habitacionRepository.findById(id).orElse(null);
        if (habitacionExistente == null) {
            return null;
        }

        habitacionExistente.setTipo(habitacionActualizada.getTipo());
        habitacionExistente.setDescripcion(habitacionActualizada.getDescripcion());
        habitacionExistente.setPrecioPorNoche(habitacionActualizada.getPrecioPorNoche());
        habitacionExistente.setCapacidad(habitacionActualizada.getCapacidad());
        habitacionExistente.setImagenUrl(habitacionActualizada.getImagenUrl());

        Habitacion habitacionGuardada = habitacionRepository.save(habitacionExistente);

        //ACTUALIZAR LAS RESERVAS QUE TIENEN ESTA HABITACIÓN
        List<Reservacion> reservas = reservaRepository.findAll();

        for (Reservacion reserva : reservas) {
            boolean contiene = reserva.getHabitaciones().stream()
                .anyMatch(h -> h.getId().equals(id));

            if (contiene) {
                // Recalcular precio total
                long dias = ChronoUnit.DAYS.between(reserva.getFechaLlegada(), reserva.getFechaSalida());

                double nuevoTotal = 0.0;
                for (Habitacion h : reserva.getHabitaciones()) {
                    Habitacion actual = habitacionRepository.findById(h.getId()).orElse(null);
                    if (actual != null) {
                        nuevoTotal += actual.getPrecioPorNoche() * dias;
                    }
                }

                reserva.setPrecioTotal(nuevoTotal);
                reservaRepository.save(reserva);
            }
        }

        return habitacionGuardada;
    }

    public void eliminarHabitacion(Long id) {
        habitacionRepository.deleteById(id);
    }
}

