package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.EmployeeLeaveAccount;
import com.techvg.shrms.service.dto.EmployeeLeaveAccountDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EmployeeLeaveAccount} and its DTO {@link EmployeeLeaveAccountDTO}.
 */
@Mapper(componentModel = "spring")
public interface EmployeeLeaveAccountMapper extends EntityMapper<EmployeeLeaveAccountDTO, EmployeeLeaveAccount> {}
