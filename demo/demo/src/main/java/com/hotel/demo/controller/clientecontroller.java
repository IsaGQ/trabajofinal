package com.hotel.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.hotel.demo.model.cliente;
import com.hotel.demo.repository.clienterepository;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/clientes")
public class clientecontroller {

    @Autowired
    private clienterepository clienteRepository;

    @PostMapping
    public ResponseEntity<cliente> addCliente(@RequestBody cliente cliente) {
        return ResponseEntity.ok(clienteRepository.save(cliente));
    }

    @GetMapping("/{id}")
    public ResponseEntity<cliente> getCliente(@PathVariable Long id) {
        return clienteRepository.findById(id)
            .map(cliente -> ResponseEntity.ok(cliente))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<cliente> updateCliente(@PathVariable Long id, @RequestBody cliente cliente) {
        if (!clienteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        cliente.setId(id);
        return ResponseEntity.ok(clienteRepository.save(cliente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        if (!clienteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        clienteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

