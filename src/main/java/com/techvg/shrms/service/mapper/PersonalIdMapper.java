package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.PersonalId;
import com.techvg.shrms.service.dto.PersonalIdDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PersonalId} and its DTO {@link PersonalIdDTO}.
 */
@Mapper(componentModel = "spring")
public interface PersonalIdMapper extends EntityMapper<PersonalIdDTO, PersonalId> {}
