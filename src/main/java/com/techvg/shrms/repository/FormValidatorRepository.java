package com.techvg.shrms.repository;

import com.techvg.shrms.domain.FormValidator;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the FormValidator entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormValidatorRepository extends JpaRepository<FormValidator, Long>, JpaSpecificationExecutor<FormValidator> {}
