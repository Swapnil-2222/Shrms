package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.Reporting;
import com.techvg.shrms.service.dto.ReportingDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Reporting} and its DTO {@link ReportingDTO}.
 */
@Mapper(componentModel = "spring")
public interface ReportingMapper extends EntityMapper<ReportingDTO, Reporting> {}
