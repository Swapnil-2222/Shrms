package com.techvg.shrms.repository;

import com.techvg.shrms.domain.PfDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PfDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PfDetailsRepository extends JpaRepository<PfDetails, Long>, JpaSpecificationExecutor<PfDetails> {}
