package com.hotel.demo.service;

import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.demo.model.habitacion;
import com.hotel.demo.model.reservacion;
import com.hotel.demo.repository.habitacionrespository;
import com.hotel.demo.repository.reservarepository;

@Service
public class habitacionservice {

    @Autowired
    private habitacionrespository habitacionRepository;

    @Autowired
    private reservarepository reservaRepository;

    public List<habitacion> obtenerTodasLasHabitaciones() {
        return habitacionRepository.findAll();
    }

    public habitacion obtenerHabitacionPorId(Long id) {
        return habitacionRepository.findById(id).orElse(null);
    }

    public habitacion crearHabitacion(habitacion habitacion) {
        return habitacionRepository.save(habitacion);
    }

    public habitacion actualizarHabitacion(Long id, habitacion habitacionActualizada) {
        habitacion habitacionExistente = habitacionRepository.findById(id).orElse(null);
        if (habitacionExistente == null) {
            return null;
        }

        habitacionExistente.setTipo(habitacionActualizada.getTipo());
        habitacionExistente.setDescripcion(habitacionActualizada.getDescripcion());
        habitacionExistente.setPrecioPorNoche(habitacionActualizada.getPrecioPorNoche());
        habitacionExistente.setCapacidad(habitacionActualizada.getCapacidad());
        habitacionExistente.setImagenUrl(habitacionActualizada.getImagenUrl());

        habitacion habitacionGuardada = habitacionRepository.save(habitacionExistente);

        //ACTUALIZAR LAS RESERVAS QUE TIENEN ESTA HABITACIÓN
        List<reservacion> reservas = reservaRepository.findAll();

        for (reservacion reserva : reservas) {
            boolean contiene = reserva.getHabitaciones().stream()
                .anyMatch(h -> h.getId().equals(id));

            if (contiene) {
                // Recalcular precio total
                long dias = ChronoUnit.DAYS.between(reserva.getFechaLlegada(), reserva.getFechaSalida());

                double nuevoTotal = 0.0;
                for (habitacion h : reserva.getHabitaciones()) {
                    habitacion actual = habitacionRepository.findById(h.getId()).orElse(null);
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

