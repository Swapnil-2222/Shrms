package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.WorkingHours;
import com.techvg.shrms.service.dto.WorkingHoursDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WorkingHours} and its DTO {@link WorkingHoursDTO}.
 */
@Mapper(componentModel = "spring")
public interface WorkingHoursMapper extends EntityMapper<WorkingHoursDTO, WorkingHours> {}
