package com.coupleconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2/users")
public class AdminController {
    @GetMapping
    public ResponseEntity<?> hello(){
        return ResponseEntity.ok("Here is user list for admin");
    }
}
