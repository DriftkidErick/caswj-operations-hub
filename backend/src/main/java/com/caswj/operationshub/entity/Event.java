package com.caswj.operationshub.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    private String organization;

    private String eventType;

    private String venue;

    @NotNull
    private LocalDate eventDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private Boolean ticketingRequired;

    private String pricingType;

    private String publicEventUrl;

    private String marketingTemplate;

    @Column(length = 2000)
    private String notes;

    private String status;
}