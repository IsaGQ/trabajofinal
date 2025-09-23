package com.hotel.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.demo.config.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private JwtUtil jwtUtil;

    public Boolean isAuthenticated(String auth) {
        try {
            String username = jwtUtil.extractUsername(auth);
            return username != null && jwtUtil.validateToken(auth, username);
        } catch (Exception e) {
            return false;
        }
    }
}