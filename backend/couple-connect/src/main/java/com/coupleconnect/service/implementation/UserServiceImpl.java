package com.coupleconnect.service.implementation;

import com.coupleconnect.entity.UserEntity;
import com.coupleconnect.repository.UserRepository;
import com.coupleconnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final CodeGeneratorService codeGeneratorService;


    private static final String UPLOAD_DIR = "uploads/users/profile";

    @Autowired
    public UserServiceImpl(UserRepository userRepository, CodeGeneratorService codeGeneratorService) {
        this.userRepository = userRepository;
        this.codeGeneratorService = codeGeneratorService;
    }

//    @Scheduled(cron = "0 0/5 * * * ?")  // Every 5 minutes
//    public void regenerateUniqueCodes() {
//        List<UserEntity> users = userRepository.findAll();  // Get all users (or you could just select active users)
//
//        for (UserEntity user : users) {
//            String newCode = codeGeneratorService.generateUniqueCode();
//            user.setUniqueCode(newCode); // Set the new code
//            userRepository.save(user); // Save the updated user with the new code
//        }
//    }

    @Override
    public boolean setupProfile(Long id, String name, MultipartFile avatar) {
        String fileName = null;

        try {
            UserEntity user = userRepository.findById(id)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not found with that id"));
            user.setDisplayName(name);
            // Create directory if not exists
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Save the avatar if provided
            if (avatar != null && !avatar.isEmpty()) {
                // Format date to remove `:` from filename
                String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
                fileName = timestamp + "_" + avatar.getOriginalFilename();
                user.setProfilePicture("/public/users/profile/"+fileName);
                Path filePath = Paths.get(UPLOAD_DIR, fileName);
                Files.createDirectories(filePath.getParent());

                Files.write(filePath, avatar.getBytes());
            }
            user.setStatus(1);
            user.setUniqueCode(codeGeneratorService.generateUniqueCode());
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
            return true;  // Indicate success
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
            return false;  // Indicate failure
        }

    }
}
