package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.PfDetails;
import com.techvg.shrms.service.dto.PfDetailsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PfDetails} and its DTO {@link PfDetailsDTO}.
 */
@Mapper(componentModel = "spring")
public interface PfDetailsMapper extends EntityMapper<PfDetailsDTO, PfDetails> {}
