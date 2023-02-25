package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.BanksDetails;
import com.techvg.shrms.service.dto.BanksDetailsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link BanksDetails} and its DTO {@link BanksDetailsDTO}.
 */
@Mapper(componentModel = "spring")
public interface BanksDetailsMapper extends EntityMapper<BanksDetailsDTO, BanksDetails> {}
