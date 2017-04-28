package com.ea.backend.location;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.ea.backend.employee.Employee;

public interface LocationRespository extends PagingAndSortingRepository<Location,Long> {
}
