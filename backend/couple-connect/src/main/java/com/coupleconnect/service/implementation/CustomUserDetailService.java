package com.coupleconnect.service.implementation;

import com.coupleconnect.entity.UserEntity;
import com.coupleconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with this email: " + email));

        if (!"SIMPLE".equalsIgnoreCase(userEntity.getAuthProvider().name())) {
            return User.builder()
                    .username(userEntity.getEmail())
                    .password("")
                    .roles(userEntity.getRole().name())
                    .build();
        }

        return User.builder()
                .username(userEntity.getEmail())
                .password(userEntity.getPassword())
                .roles(getRoles(userEntity))
                .build();
    }

    private String getRoles(UserEntity user) {
        if (user.getRole() != null) {
            return user.getRole().name(); // Default role
        }
        return "ROLE_USER"; // Return the role as a String
    }
}
