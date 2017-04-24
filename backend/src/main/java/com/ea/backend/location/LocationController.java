package com.ea.backend.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LocationController {

	@Autowired
	private LocationRespository locationRepository;
	
	@GetMapping("/locations/")
	public Iterable<Location> getAllEmployee() {
		return locationRepository.findAll();
	}
}
