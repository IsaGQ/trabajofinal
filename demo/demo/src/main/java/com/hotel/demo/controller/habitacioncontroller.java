package com.hotel.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.hotel.demo.model.Habitacion;
import com.hotel.demo.service.HabitacionService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequestMapping("/api/habitaciones")
public class HabitacionController {

    @Autowired
    private HabitacionService habitacionService;

    @GetMapping
    public List<Habitacion> listarHabitaciones() {
        return habitacionService.obtenerTodasLasHabitaciones();
    }

    @GetMapping("/{id}")
    public Habitacion obtenerHabitacion(@PathVariable Long id) {
        return habitacionService.obtenerHabitacionPorId(id);
    }

    @PostMapping
    public Habitacion crearHabitacion(@RequestBody Habitacion habitacion) {
        return habitacionService.crearHabitacion(habitacion);
    }

    @PutMapping("/{id}")
    public Habitacion actualizarHabitacion(@PathVariable Long id, @RequestBody Habitacion habitacion) {
        return habitacionService.actualizarHabitacion(id, habitacion);
    }

    @DeleteMapping("/{id}")
    public void eliminarHabitacion(@PathVariable Long id) {
        habitacionService.eliminarHabitacion(id);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> subirImagen(@RequestParam("file") MultipartFile file) {
        try {
            // Carpeta donde se guardarán las imágenes
            String carpetaDestino = "uploads/";

            // Crear la carpeta si no existe
            Path rutaCarpeta = Paths.get(carpetaDestino);
            if (!Files.exists(rutaCarpeta)) {
                Files.createDirectories(rutaCarpeta);
            }

            // Guardar el archivo
            Path rutaArchivo = rutaCarpeta.resolve(file.getOriginalFilename());
            Files.write(rutaArchivo, file.getBytes());

            // Devolver ruta para guardarla en imagenUrl
            String rutaImagen = "/uploads/" + file.getOriginalFilename(); // Puedes ajustarlo según el frontend
            return ResponseEntity.ok(rutaImagen);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen");
        }
    }

}
