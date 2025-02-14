package com.coupleconnect.controller;

import com.coupleconnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Value("${project.image.upload-dir}")
    private String uploadDir;

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> hello(){
        return ResponseEntity.ok("Here is user list");
    }

    @PatchMapping("/{userId}/profile/setup")
    public ResponseEntity<?> updateUserProfile(
            @PathVariable("userId") Long userId,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {
        boolean status = userService.setupProfile(userId,name,avatar);
        if (status){
            return ResponseEntity.ok().build()  ;
        }

        return ResponseEntity.internalServerError().build();
    }
}

