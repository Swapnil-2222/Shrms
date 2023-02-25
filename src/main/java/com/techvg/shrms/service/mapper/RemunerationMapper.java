package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.Remuneration;
import com.techvg.shrms.service.dto.RemunerationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Remuneration} and its DTO {@link RemunerationDTO}.
 */
@Mapper(componentModel = "spring")
public interface RemunerationMapper extends EntityMapper<RemunerationDTO, Remuneration> {}
