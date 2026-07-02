package com.caswj.operationshub.repository;

import com.caswj.operationshub.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
