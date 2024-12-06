package com.pelatro.signup.serviceImp;



import com.pelatro.signup.entity.Employee;
import com.pelatro.signup.repository.EmployeeRepository;
import com.pelatro.signup.service.EmployeeService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class EmployeeServiceImp implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public EmployeeServiceImp(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<Employee> getAllEmployees() {
        // Fetch only active employees (not deleted)
        return employeeRepository.findAllActiveEmployees();
    }
    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee); // Save the new employee to the database
    }

    @Override
    public Employee getEmployeeById(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        return employee.orElseThrow(() -> new RuntimeException("Employee not found with id: " + id)); // Return the employee if found, or throw an exception
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        // Fetch the existing employee by id and ensure it is not deleted
        Optional<Employee> existingEmployeeOpt = employeeRepository.findByIdAndIsDeletedFalse(id);

        // Check if the employee exists and is not deleted
        if (!existingEmployeeOpt.isPresent()) {
            throw new RuntimeException("Employee not found or is marked as deleted with id: " + id);
        }

        // Get the existing employee
        Employee existingEmployee = existingEmployeeOpt.get();
        
        entityManager.refresh(existingEmployee);

        // Update employee fields
        existingEmployee.setFirstName(employee.getFirstName());
        existingEmployee.setLastName(employee.getLastName());
        existingEmployee.setEmailId(employee.getEmailId());
        existingEmployee.setRole(employee.getRole());
        existingEmployee.setDepartment(employee.getDepartment());
        existingEmployee.setPhoneNumber(employee.getPhoneNumber()); // Update phone number if necessary

        // Save and return the updated employee
        return employeeRepository.save(existingEmployee); // Save the updated employee to the database
    }



    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        // Perform soft delete by setting `isDeleted` to true
        employee.setIsDeleted(true);
        employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getDeletedEmployees() {
        // Fetch deleted employees using the repository method
        return employeeRepository.findDeletedEmployees();
    }
}
