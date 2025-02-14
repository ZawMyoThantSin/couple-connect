package com.coupleconnect.service;

import com.coupleconnect.dto.request.SignupRequest;
import com.coupleconnect.entity.UserEntity;

public interface AuthService {
    UserEntity register(SignupRequest request);
}
