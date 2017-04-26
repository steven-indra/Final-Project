package com.ea.backend;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.*;

import com.ea.backend.employee.Employee;
import com.ea.backend.employee.EmployeeRepository;
import com.ea.backend.location.Location;
import com.ea.backend.location.LocationRespository;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	
	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private LocationRespository locationRepository;
	
	List<Location> dummyLocation = new ArrayList<Location>();
	List<Employee> dummyEmployee = new ArrayList<Employee>();
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/employees/").allowedOrigins("http://localhost:3000");
                registry.addMapping("/employees/{id}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/employees/contain").allowedOrigins("http://localhost:3000");
                registry.addMapping("/employees/add").allowedOrigins("http://localhost:3000/employees/add");
                registry.addMapping("/locations/").allowedOrigins("http://localhost:3000");
            }
        };
    }
	
	@Bean
	public CommandLineRunner printAll(ApplicationContext ctx){
		return args -> {
			initialLocationDummy();
			initialEmployeeDummy();
		};
	}
	
	private void initialLocationDummy()
	{
		dummyLocation.add(new Location("Jakarta"));
		dummyLocation.add(new Location("Bandung"));
		dummyLocation.add(new Location("Yogyakarta"));
		dummyLocation.add(new Location("Bali"));
		dummyLocation.add(new Location("Surabaya"));
		dummyLocation.add(new Location("Tangerang"));
		locationRepository.save(dummyLocation);
	}
	
	private void initialEmployeeDummy()
	{
		/*firstName, lastName, gender, dob, nationality, maritalStatus, phone, 
		 *subDivision, status, suspendDate, hiredDate, grade, division, email, location*/
		dummyEmployee.add(new Employee("Peter","Parker","Male",new Date(),"Indonesian","Single", "+12839124781"
					,"Java Bootcamp", "Contract", new Date(), new Date(), "SE - PG", "CDC AsteRx","Peter.Parker@gmail.com", dummyLocation.get(0)));
		dummyEmployee.add(new Employee("Harry","Potter","Male",new Date(),"Indonesian","Married", "+1283911211"
				,"Sub Division1", "Full Time", null, new Date(), "SE - JP", "SWD Red","Harry.Potter@gmail.com", dummyLocation.get(1)));
		dummyEmployee.add(new Employee("John","Travis","Male",new Date(),"Australian","Single", "+12839124781"
				,"Java Bootcamp", "Contract", null, new Date(), "SE - AN", "SWD Red","John.Travis@gmail.com", dummyLocation.get(2)));
		dummyEmployee.add(new Employee("Jack","Ripper","Male",new Date(),"Indonesian","Single", "+12839124781"
				,"Java Bootcamp", "Contract", null, new Date(), "SE - PG", "SWD Green","Jack.Ripper@gmail.com", dummyLocation.get(3)));
		dummyEmployee.add(new Employee("Johny","Andrean","Male",new Date(),"Indonesian","Single", "+12839124781"
				,"Java Bootcamp", "Contract", null, new Date(), "SE - PG", "CDC AsteRx","Johny.Andrean@gmail.com", dummyLocation.get(4)));
		dummyEmployee.add(new Employee("Jackie","Chan","Male",new Date(),"Indonesian","Single", "+12839124781"
				,"Java Bootcamp", "Contract", null, new Date(), "SE - PG", "CDC AsteRx","Jackie.Chan@gmail.com", dummyLocation.get(5)));
		dummyEmployee.add(new Employee("Dora","Explorer","Female",new Date(),"Indonesian","Single", "+12839124781"
				,"Sub Division2", "Contract", null, new Date(), "SE - PG", "CDC AsteRx","Dora.Explorer@gmail.com", dummyLocation.get(0)));
		dummyEmployee.add(new Employee("Minnie","Mouse","Female",new Date(),"Indonesian","Married", "+12839124781"
				,"Java Bootcamp", "Contract", null, new Date(), "SE - PG", "CDC AsteRx","Minnie.Mouse@gmail.com", dummyLocation.get(1)));
		dummyEmployee.add(new Employee("Mickey","Mouse","Male",new Date(),"Indonesian","Married", "+12839124781"
				,"Java Bootcamp", "Contract", null, new Date(), "SE - PG", "CDC AsteRx","Mickey.Mouse@gmail.com", dummyLocation.get(2)));
		dummyEmployee.add(new Employee("Daisy","Duck","Female",new Date(),"Indonesian","Married", "+12839124781"
				,"Java Bootcamp", "Full Time", null, new Date(), "SE - PG", "CDC AsteRx","Daisy.Duck@gmail.com", dummyLocation.get(3)));
		dummyEmployee.add(new Employee("Donald","Duck","Male",new Date(),"Indonesian","Married", "+12839124781"
				,"Java Bootcamp", "Contract", null, new Date(), "SE - PG", "CDC AsteRx","Donald.Duck@gmail.com", dummyLocation.get(4)));
		dummyEmployee.add(new Employee("Patrick","Star","Male",new Date(),"Indonesian","Single", "+12839124781"
				,"Java Bootcamp", "Contract", null, new Date(), "SE - PG", "CDC AsteRx","Patrick.Star@gmail.com", dummyLocation.get(5)));
		dummyEmployee.add(new Employee("Johnie","Star","Male",new Date(),"Indonesian","Single", "+12839124781"
				,"Java Bootcamp", "Full Time", null, new Date(), "SE - PG", "CDC AsteRx","Johnie.Star@gmail.com", dummyLocation.get(0)));
		employeeRepository.save(dummyEmployee);
	}
}
