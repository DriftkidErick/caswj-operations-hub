package com.caswj.operationshub.repository;

import com.caswj.operationshub.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
