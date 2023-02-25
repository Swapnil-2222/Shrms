package com.techvg.shrms.repository;

import com.techvg.shrms.domain.CustomLeavePolicy;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CustomLeavePolicy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomLeavePolicyRepository extends JpaRepository<CustomLeavePolicy, Long>, JpaSpecificationExecutor<CustomLeavePolicy> {}
