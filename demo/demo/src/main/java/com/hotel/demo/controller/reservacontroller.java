package com.hotel.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.hotel.demo.model.reservacion;
import com.hotel.demo.service.reservasrvice;

@RestController
@RequestMapping("/api/reservas")
public class reservacontroller {

    @Autowired
    private reservasrvice reservaService;

    @GetMapping
    public List<reservacion> listarReservas() {
        return reservaService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public reservacion obtenerReserva(@PathVariable Long id) {
        return reservaService.obtenerPorId(id);
    }

    @PostMapping
    public reservacion crearReserva(@RequestBody reservacion reserva) {
        return reservaService.crearReserva(reserva);
    }

    @PutMapping("/{id}")
    public reservacion actualizarReserva(@PathVariable Long id, @RequestBody reservacion reserva) {
        return reservaService.actualizarReserva(id, reserva);
    }

    @DeleteMapping("/{id}")
    public void eliminarReserva(@PathVariable Long id) {
        reservaService.eliminarReserva(id);
    }

    @GetMapping("/habitacion/{id}/tiene-reservas")
    public boolean verificarReservasPorHabitacion(@PathVariable Long id) {
        return reservaService.tieneReservasPorHabitacion(id);
    }

}
