package com.coupleconnect.service;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    boolean setupProfile(Long id, String name, MultipartFile avatar);
}
