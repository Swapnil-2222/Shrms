package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.LeaveApplication;
import com.techvg.shrms.service.dto.LeaveApplicationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LeaveApplication} and its DTO {@link LeaveApplicationDTO}.
 */
@Mapper(componentModel = "spring")
public interface LeaveApplicationMapper extends EntityMapper<LeaveApplicationDTO, LeaveApplication> {}
