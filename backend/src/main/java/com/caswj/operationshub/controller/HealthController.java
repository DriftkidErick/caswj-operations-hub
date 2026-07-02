package com.caswj.operationshub.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")

    public String healthCheck() {

        return "CASWJ Operations Hub API is running";

    }
}
