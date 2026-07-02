package com.caswj.operationshub.service;

import com.caswj.operationshub.entity.Person;
import com.caswj.operationshub.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository){
        this.personRepository = personRepository;
    }

    public List<Person> getAllPeople(){
        return personRepository.findAll();
    }

    public Person getPersonById(Long id){
        return personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found with id: " + id));
    }

    //
    public Person createPerson(Person person){
        return personRepository.save(person);
    }

    //Update Person based on their ID
    public Person updatePerson(Long id, Person updatedPerson){
        Person existingPerson = getPersonById(id);

        existingPerson.setName(updatedPerson.getName());
        existingPerson.setRole(updatedPerson.getRole());
        existingPerson.setEmail(updatedPerson.getEmail());
        existingPerson.setPhone(updatedPerson.getPhone());

        return personRepository.save(existingPerson);
    }

    //Function to delete the person based on their ID
    public void deletePerson(Long id){
        Person existingPerson = getPersonById(id);
        personRepository.delete(existingPerson);
    }
}