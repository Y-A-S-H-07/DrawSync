package com.drawsync.backend.controller;

import com.drawsync.backend.model.User;
import com.drawsync.backend.service.JwtService;
import com.drawsync.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        User existingUser = userService.login(user.getEmail(), user.getPassword());

        String token = jwtService.generateToken(existingUser.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return response;
    }

    @GetMapping("/test")
    public String test(HttpServletRequest request) {
        return "User: " + request.getAttribute("userEmail");
    }
}