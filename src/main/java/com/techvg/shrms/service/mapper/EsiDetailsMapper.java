package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.EsiDetails;
import com.techvg.shrms.service.dto.EsiDetailsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EsiDetails} and its DTO {@link EsiDetailsDTO}.
 */
@Mapper(componentModel = "spring")
public interface EsiDetailsMapper extends EntityMapper<EsiDetailsDTO, EsiDetails> {}
