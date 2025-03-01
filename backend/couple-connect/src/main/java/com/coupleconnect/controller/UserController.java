package com.coupleconnect.controller;

import com.coupleconnect.dto.response.UserProfileResponse;
import com.coupleconnect.entity.UserEntity;
import com.coupleconnect.repository.UserRepository;
import com.coupleconnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Value("${project.image.upload-dir}")
    private String uploadDir;

    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }

        Object principal = authentication.getPrincipal();
        String email;

        // Handle OAuth2 users
//        if (principal instanceof OAuth2User) {
//            OAuth2User oauthUser = (OAuth2User) principal;
//            email = oauthUser.getAttribute("email");
//        }
        // Handle normal users
//        else
        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            email = userDetails.getUsername();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unsupported authentication type");
        }

        // Fetch user from the database
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with this Email: " + email));

        // Prepare response
        UserProfileResponse response = new UserProfileResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());
        response.setProfile(user.getProfilePicture());
        response.setUniqueCode(user.getUniqueCode());
        response.setHasPartner(user.isHasPartner());
        response.setAuthProvider(user.getAuthProvider().name());
        response.setCreate_at(user.getCreatedAt());
        return ResponseEntity.ok(response);
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

