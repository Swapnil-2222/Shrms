package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.Designation;
import com.techvg.shrms.service.dto.DesignationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Designation} and its DTO {@link DesignationDTO}.
 */
@Mapper(componentModel = "spring")
public interface DesignationMapper extends EntityMapper<DesignationDTO, Designation> {}
