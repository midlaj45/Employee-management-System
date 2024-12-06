package com.pelatro.signup.service;



import com.pelatro.signup.entity.Employee;
import java.util.List;

public interface EmployeeService {
	    List<Employee> getAllEmployees(); // Get all active employees
	    Employee createEmployee(Employee employee); // Create a new employee
	    Employee getEmployeeById(Long id); // Get employee by ID
	    Employee updateEmployee(Long id, Employee employee); // Update an employee
	    void deleteEmployee(Long id); // Soft delete an employee
	    List<Employee> getDeletedEmployees(); // Get all deleted employees
}
