package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.CustomLeavePolicy;
import com.techvg.shrms.service.dto.CustomLeavePolicyDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CustomLeavePolicy} and its DTO {@link CustomLeavePolicyDTO}.
 */
@Mapper(componentModel = "spring")
public interface CustomLeavePolicyMapper extends EntityMapper<CustomLeavePolicyDTO, CustomLeavePolicy> {}
