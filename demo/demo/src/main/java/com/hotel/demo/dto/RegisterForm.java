package com.hotel.demo.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class RegisterForm {
    private String nombreCompleto;
    private String correo;
    private String direccion;
    private String celular;
    private String username;
    private String password;
}
