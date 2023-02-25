package com.techvg.shrms.repository;

import com.techvg.shrms.domain.EsiDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EsiDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EsiDetailsRepository extends JpaRepository<EsiDetails, Long>, JpaSpecificationExecutor<EsiDetails> {}
