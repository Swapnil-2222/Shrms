package com.techvg.shrms.service.mapper;

import com.techvg.shrms.domain.Contacts;
import com.techvg.shrms.service.dto.ContactsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Contacts} and its DTO {@link ContactsDTO}.
 */
@Mapper(componentModel = "spring")
public interface ContactsMapper extends EntityMapper<ContactsDTO, Contacts> {}
