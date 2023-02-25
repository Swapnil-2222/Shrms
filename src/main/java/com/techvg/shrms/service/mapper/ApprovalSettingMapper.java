package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.ApprovalSetting;
import com.techvg.shrms.service.dto.ApprovalSettingDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ApprovalSetting} and its DTO {@link ApprovalSettingDTO}.
 */
@Mapper(componentModel = "spring")
public interface ApprovalSettingMapper extends EntityMapper<ApprovalSettingDTO, ApprovalSetting> {}
