package com.techvg.shrms.repository;

import com.techvg.shrms.domain.Remuneration;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Remuneration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RemunerationRepository extends JpaRepository<Remuneration, Long>, JpaSpecificationExecutor<Remuneration> {}
