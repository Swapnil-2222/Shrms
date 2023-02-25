package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.Education;
import com.techvg.shrms.service.dto.EducationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Education} and its DTO {@link EducationDTO}.
 */
@Mapper(componentModel = "spring")
public interface EducationMapper extends EntityMapper<EducationDTO, Education> {}
