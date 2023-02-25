package com.techvg.shrms.repository;

import com.techvg.shrms.domain.PersonalId;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PersonalId entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonalIdRepository extends JpaRepository<PersonalId, Long>, JpaSpecificationExecutor<PersonalId> {}
