package com.coupleconnect.controller;

import com.coupleconnect.dto.request.LoginRequest;
import com.coupleconnect.dto.request.SignupRequest;
import com.coupleconnect.dto.response.HttpResponse;
import com.coupleconnect.dto.response.LoginResponse;
import com.coupleconnect.dto.response.SignupResponse;
import com.coupleconnect.entity.UserEntity;
import com.coupleconnect.exception.EmailAlreadyExistsException;
import com.coupleconnect.exception.MissingFieldException;
import com.coupleconnect.repository.UserRepository;
import com.coupleconnect.service.AuthService;
import com.coupleconnect.service.implementation.CustomUserDetailService;
import com.coupleconnect.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailService userDetailService;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;


    @Autowired
    public AuthController(AuthenticationManager authenticationManager, CustomUserDetailService userDetailService, AuthService authService, UserRepository userRepository, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
        this.authService = authService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest request) {
        try {
            UserEntity createdUserEntity = authService.register(request);
            String token = jwtUtil.generateToken(
                    createdUserEntity.getEmail(),
                    "ROLE_"+createdUserEntity.getRole().name(),
                    createdUserEntity.getId()
            );

            SignupResponse response = new SignupResponse(
                    createdUserEntity.getCreatedAt(),
                    createdUserEntity.getId(),
                    createdUserEntity.getName(),
                    createdUserEntity.getEmail(),
                    token
            );

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(HttpResponse.success("User Created Successfully", response));

        } catch (EmailAlreadyExistsException | MissingFieldException ex) {
            throw ex;
        } catch (Exception ex) {
            // Catch any other unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(HttpResponse.error("An unexpected error occurred"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

        try {
            // Authenticate the user credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(403).body(new LoginResponse(0L,"null","Invalid credentials"));
        }
        UserEntity oUser= userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()-> new UsernameNotFoundException("User Not Found"));

        UserDetails userDetails;
        try {
            userDetails = userDetailService.loadUserByUsername(loginRequest.getEmail());
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponse(0L,"null","User not found"));
        }
        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("USER");
//        System.out.println("In Login role:"+ role);

        if ("ROLE_USER".equals(role)) {
            if (oUser.getStatus() == 0) {
                // user needs to configure their avatar
                String token = jwtUtil.generateToken(oUser.getEmail(), role, oUser.getId());
                return ResponseEntity.ok(new LoginResponse(oUser.getId(),token, "SETUP_REQUIRED"));
            } else if (oUser.getStatus() == 1) {
                // Owner can proceed to their dashboard
                String token = jwtUtil.generateToken(oUser.getEmail(), role, oUser.getId());
                return ResponseEntity.ok(new LoginResponse(oUser.getId(),token, "LOGIN_SUCCESSFUL"));
            }
        }
        String jwt = jwtUtil.generateToken(userDetails.getUsername(),role,oUser.getId());//error
        // Return response wit JWT
        return ResponseEntity.ok(new LoginResponse(oUser.getId(), jwt,"LOGIN_SUCCESSFUL"+oUser.getId()));
    }
}
