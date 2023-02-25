package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.FormValidator;
import com.techvg.shrms.service.dto.FormValidatorDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link FormValidator} and its DTO {@link FormValidatorDTO}.
 */
@Mapper(componentModel = "spring")
public interface FormValidatorMapper extends EntityMapper<FormValidatorDTO, FormValidator> {}
