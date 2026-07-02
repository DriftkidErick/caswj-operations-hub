package com.caswj.operationshub.repository;

import com.caswj.operationshub.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}