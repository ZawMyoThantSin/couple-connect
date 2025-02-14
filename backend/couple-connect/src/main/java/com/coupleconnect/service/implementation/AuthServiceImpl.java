package com.coupleconnect.service.implementation;

import com.coupleconnect.dto.request.SignupRequest;
import com.coupleconnect.entity.UserEntity;
import com.coupleconnect.enumeration.AuthProvider;
import com.coupleconnect.exception.EmailAlreadyExistsException;
import com.coupleconnect.exception.MissingFieldException;
import com.coupleconnect.repository.UserRepository;
import com.coupleconnect.service.AuthService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.time.LocalDateTime;
import java.util.Optional;


@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserEntity register(SignupRequest request) {
        if (request.getEmail() == null || request.getEmail().isEmpty() ||
                request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new MissingFieldException("Required fields are missing");
        }

        Optional<UserEntity> oUser = userRepository.findByEmail(request.getEmail());
        if (oUser.isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(request, userEntity);
        userEntity.setPassword(passwordEncoder.encode(CharBuffer.wrap(request.getPassword())));
        userEntity.setAuthProvider(AuthProvider.SIMPLE);
        userEntity.setCreatedAt(LocalDateTime.now());

        return userRepository.save(userEntity);
    }
}
