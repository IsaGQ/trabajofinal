package com.hotel.demo.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.Data;

@Getter
@Setter
@Data
public class UsuarioDTO {
    private Long id;
    private String username;
    private String email;

    public UsuarioDTO(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }


}


