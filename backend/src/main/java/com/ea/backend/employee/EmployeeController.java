package com.ea.backend.employee;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.ea.backend.location.Location;
import com.ea.backend.location.LocationRespository;

@RestController
public class EmployeeController {

	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-mm-dd");

	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private LocationRespository locationRespository;

	@GetMapping("/employees/")
	public Iterable<Employee> getAllEmployee() {
		Sort.Order sorting = new Sort.Order(Sort.Direction.ASC, "lastName").ignoreCase();
		return employeeRepository.findAll(new Sort(sorting));
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/employees/addorupdate", method = { RequestMethod.POST, RequestMethod.PUT })
	public Employee addOrUpdateEmployee(@RequestParam(value = "empId", required = false) String empId,
			@RequestParam String firstName, @RequestParam String lastName, @RequestParam String gender,
			@RequestParam String dob, @RequestParam String nationality, @RequestParam String maritalStatus,
			@RequestParam String phone, @RequestParam String subDivision, @RequestParam String status,
			@RequestParam String suspendDate, @RequestParam String hiredDate, @RequestParam String grade,
			@RequestParam String division, @RequestParam String email, @RequestParam String location,
			@RequestParam(value = "file", required = false) MultipartFile file) {
		Employee emp = new Employee();
		if (empId != null) {
			// Employee already exist => update data
			emp = employeeRepository.findOne(Long.parseLong(empId));
		}
		emp.setFirstName(firstName);
		emp.setLastName(lastName);
		emp.setGender(gender);
		try {
			emp.setDob(formatter.parse(dob));
			if (!suspendDate.equals("")) {
				emp.setSuspendDate(formatter.parse(suspendDate));
			}
			emp.setHiredDate(formatter.parse(hiredDate));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		emp.setNationality(nationality);
		emp.setMaritalStatus(maritalStatus);
		emp.setPhone(phone);
		emp.setSubDivision(subDivision);
		emp.setStatus(status);
		emp.setGrade(grade);
		emp.setDivision(division);
		emp.setEmail(email);
		Location empLoc = locationRespository.findByLocationCityIgnoreCase(location);
		emp.setLocation(empLoc);
		try {
			if (file != null) {
				emp.setImage(file.getBytes());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return employeeRepository.save(emp);
	}

	@GetMapping("/employees/contain")
	public Iterable<Employee> getAllEmployeeContaining(@RequestParam String firstName, @RequestParam String lastName,
			@RequestParam String gender, @RequestParam String location, @RequestParam String sort) {
		Sort.Order sorting;
		if (sort.equals("asc")) {
			sorting = new Sort.Order(Sort.Direction.ASC, "lastName").ignoreCase();
		} else {
			sorting = new Sort.Order(Sort.Direction.DESC, "lastName").ignoreCase();
		}
		if (gender.equals("") && location.equals("")) {
			return employeeRepository.findByFirstNameContainingOrLastNameContainingAllIgnoreCase(firstName, lastName,
					new Sort(sorting));
		} else if (gender.equals("") && !location.equals("")){
			return employeeRepository.findByLocationAndSort(firstName.toUpperCase(), lastName.toUpperCase(),
					location.toUpperCase(), new Sort(sorting));
		}else if (!gender.equals("") && location.equals("")){
			return employeeRepository.findByGenderAndSort(firstName.toUpperCase(), lastName.toUpperCase(),
					gender.toUpperCase(), new Sort(sorting));
		}else
		{
			return employeeRepository.findByLocationGenderAndSort(firstName.toUpperCase(), lastName.toUpperCase(),
					gender.toUpperCase(), location.toUpperCase(), new Sort(sorting));
		}
	}

	@GetMapping("/employees/{id}")
	public Employee getEmployeeById(@PathVariable long id) {
		return employeeRepository.findOne(id);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/employees/{id}")
	public Long deleteEmployeeById(@PathVariable long id) {
		return employeeRepository.deleteByEmpId(id);
	}
}
