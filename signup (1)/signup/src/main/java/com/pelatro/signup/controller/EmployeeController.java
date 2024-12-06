package com.pelatro.signup.controller;

import com.pelatro.signup.response.ApiResponse;
import com.pelatro.signup.entity.Employee;
import com.pelatro.signup.service.EmployeeService;
import com.pelatro.signup.service.WorkingHoursFileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200")
//@PreAuthorize("hasRole('USER')") // Ensure only authenticated users with 'USER' role can access
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Get all employees
    @GetMapping
    public ResponseEntity<ApiResponse<List<Employee>>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        ApiResponse<List<Employee>> response = new ApiResponse<>(
                employees,
                "Employees fetched successfully",
                HttpStatus.OK.value()
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Get an employee by id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Employee>> getEmployeeById(@PathVariable("id") Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        ApiResponse<Employee> response = new ApiResponse<>(
                employee,
                "Employee fetched successfully",
                HttpStatus.OK.value()
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Create a new employee
    @PostMapping
    public ResponseEntity<ApiResponse<Employee>> createEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeService.createEmployee(employee);
        ApiResponse<Employee> response = new ApiResponse<>(
                savedEmployee,
                "Employee created successfully",
                HttpStatus.CREATED.value()
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Update an existing employee
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Employee>> updateEmployee(@PathVariable("id") Long id, @RequestBody Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);
        ApiResponse<Employee> response = new ApiResponse<>(
                updatedEmployee,
                "Employee updated successfully",
                HttpStatus.OK.value()
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete an employee
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        ApiResponse<Void> response = new ApiResponse<>(
                null,
                "Employee deleted successfully",
                HttpStatus.OK.value()
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/deleted")
    public ResponseEntity<ApiResponse<List<Employee>>> getDeletedEmployees() {
        List<Employee> deletedEmployees = employeeService.getDeletedEmployees();
        ApiResponse<List<Employee>> response = new ApiResponse<>(
                deletedEmployees,
                "Deleted employees fetched successfully",
                HttpStatus.OK.value()
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Autowired
    private WorkingHoursFileService fileService;
 
    @PostMapping("/save")
    public ResponseEntity<String> saveWorkingHours(@RequestBody String record) {
        fileService.appendToFile(record);
        return ResponseEntity.ok("Record appended to file successfully.");
    }

}
