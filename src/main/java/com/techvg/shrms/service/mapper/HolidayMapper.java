package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.Holiday;
import com.techvg.shrms.service.dto.HolidayDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Holiday} and its DTO {@link HolidayDTO}.
 */
@Mapper(componentModel = "spring")
public interface HolidayMapper extends EntityMapper<HolidayDTO, Holiday> {}
