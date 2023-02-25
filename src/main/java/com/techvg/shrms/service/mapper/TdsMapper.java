package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.Tds;
import com.techvg.shrms.service.dto.TdsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Tds} and its DTO {@link TdsDTO}.
 */
@Mapper(componentModel = "spring")
public interface TdsMapper extends EntityMapper<TdsDTO, Tds> {}
