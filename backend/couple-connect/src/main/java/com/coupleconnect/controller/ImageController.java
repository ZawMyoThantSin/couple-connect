package com.coupleconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/public/")
public class ImageController {
    @Value("${project.image.upload-dir}") // Specify folder path in application.properties
    private String uploadDir;


    // Controller Method
    @GetMapping("/users/profile/{filename}")
    public ResponseEntity<Resource> getProductImage(@PathVariable String filename) throws MalformedURLException, IOException {
        Path imagePath = Paths.get(uploadDir + "/users/profile").resolve(filename);
        Resource imageResource = new UrlResource(imagePath.toUri());

        if (imageResource.exists() && imageResource.isReadable()) {
            // Dynamically determine the content type
            String contentType = Files.probeContentType(imagePath);
            if (contentType == null) {
                contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // Fallback content type
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + imageResource.getFilename() + "\"")
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(imageResource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
