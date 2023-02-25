package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.ApprovalLevel;
import com.techvg.shrms.service.dto.ApprovalLevelDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ApprovalLevel} and its DTO {@link ApprovalLevelDTO}.
 */
@Mapper(componentModel = "spring")
public interface ApprovalLevelMapper extends EntityMapper<ApprovalLevelDTO, ApprovalLevel> {}
