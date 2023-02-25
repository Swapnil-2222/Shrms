package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.EmploymentType;
import com.techvg.shrms.service.dto.EmploymentTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EmploymentType} and its DTO {@link EmploymentTypeDTO}.
 */
@Mapper(componentModel = "spring")
public interface EmploymentTypeMapper extends EntityMapper<EmploymentTypeDTO, EmploymentType> {}
