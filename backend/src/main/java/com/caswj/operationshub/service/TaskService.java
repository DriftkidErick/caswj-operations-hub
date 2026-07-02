package com.caswj.operationshub.service;

import com.caswj.operationshub.entity.Task;
import com.caswj.operationshub.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id){
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updatedTask){
        Task existingTask = getTaskById(id);

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setDueDate(updatedTask.getDueDate());
        existingTask.setStatus(updatedTask.getStatus());
        existingTask.setPriority(updatedTask.getPriority());
        existingTask.setCategory(updatedTask.getCategory());
        existingTask.setCompleted(updatedTask.getCompleted());
        existingTask.setNotes(updatedTask.getNotes());
        existingTask.setCompany(updatedTask.getCompany());
        existingTask.setEvent(updatedTask.getEvent());
        existingTask.setAssignedTo(updatedTask.getAssignedTo());

        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long id){
        Task existingTask = getTaskById(id);
        taskRepository.delete(existingTask);
    }
}