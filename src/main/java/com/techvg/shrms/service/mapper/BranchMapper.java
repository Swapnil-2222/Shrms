package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.Branch;
import com.techvg.shrms.service.dto.BranchDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Branch} and its DTO {@link BranchDTO}.
 */
@Mapper(componentModel = "spring")
public interface BranchMapper extends EntityMapper<BranchDTO, Branch> {}
