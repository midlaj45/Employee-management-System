/*package com.pelatro.signup.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pelatro.signup.DTO.PerformanceDTO;
import com.pelatro.signup.service.PerformanceService;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/performance")
@CrossOrigin(origins = "http://localhost:4200") // Adjust for your Angular app's URL
public class PerformanceReportController {

    @GetMapping("/report")
    public Resource getPerformanceReport() throws Exception {
        Path path = Paths.get("/home/pelatro/Hbasedatastoragefile/performance_result.txt");
        Resource resource = new UrlResource(path.toUri());
        if (resource.exists()) {
            return resource;
        } else {
            throw new Exception("File not found");
        }
    }
}*/

package com.pelatro.signup.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/performance")
@CrossOrigin(origins = "http://localhost:4200") // Allow CORS for Angular app
public class PerformanceReportController {

    @GetMapping("/report")
    public ResponseEntity<Resource> getPerformanceReport() {
        try {
            Path path = Paths.get("/home/pelatro/Hbasedatastoragefile/performance/performance_result.txt");
            Resource resource = new UrlResource(path.toUri());
            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=performance_result.txt")
                        .body(resource);
            } else {
                return ResponseEntity.status(404).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}


