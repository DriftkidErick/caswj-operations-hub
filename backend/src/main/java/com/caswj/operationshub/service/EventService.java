package com.caswj.operationshub.service;

import com.caswj.operationshub.entity.Event;

import com.caswj.operationshub.repository.EventRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {

        this.eventRepository = eventRepository;

    }

    public List<Event> getAllEvents() {

        return eventRepository.findAll();

    }

    public Event getEventById(Long id) {

        return eventRepository.findById(id)

                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));

    }

    public Event createEvent(Event event) {

        return eventRepository.save(event);

    }

    public Event updateEvent(Long id, Event updatedEvent) {

        Event existingEvent = getEventById(id);

        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setOrganization(updatedEvent.getOrganization());
        existingEvent.setEventType(updatedEvent.getEventType());
        existingEvent.setVenue(updatedEvent.getVenue());
        existingEvent.setEventDate(updatedEvent.getEventDate());
        existingEvent.setStartTime(updatedEvent.getStartTime());
        existingEvent.setEndTime(updatedEvent.getEndTime());
        existingEvent.setTicketingRequired(updatedEvent.getTicketingRequired());
        existingEvent.setPricingType(updatedEvent.getPricingType());
        existingEvent.setPublicEventUrl(updatedEvent.getPublicEventUrl());
        existingEvent.setMarketingTemplate(updatedEvent.getMarketingTemplate());
        existingEvent.setNotes(updatedEvent.getNotes());
        existingEvent.setStatus(updatedEvent.getStatus());

        return eventRepository.save(existingEvent);
    }

    public void deleteEvent(Long id) {

        Event existingEvent = getEventById(id);

        eventRepository.delete(existingEvent);

    }

}