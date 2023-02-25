package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.CustomApprovar;
import com.techvg.shrms.service.dto.CustomApprovarDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CustomApprovar} and its DTO {@link CustomApprovarDTO}.
 */
@Mapper(componentModel = "spring")
public interface CustomApprovarMapper extends EntityMapper<CustomApprovarDTO, CustomApprovar> {}
