package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.MasterLookup;
import com.techvg.shrms.service.dto.MasterLookupDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link MasterLookup} and its DTO {@link MasterLookupDTO}.
 */
@Mapper(componentModel = "spring")
public interface MasterLookupMapper extends EntityMapper<MasterLookupDTO, MasterLookup> {}
