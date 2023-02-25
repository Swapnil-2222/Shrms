package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.WorkDaysSetting;
import com.techvg.shrms.service.dto.WorkDaysSettingDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WorkDaysSetting} and its DTO {@link WorkDaysSettingDTO}.
 */
@Mapper(componentModel = "spring")
public interface WorkDaysSettingMapper extends EntityMapper<WorkDaysSettingDTO, WorkDaysSetting> {}
