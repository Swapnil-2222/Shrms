package com.techvg.shrms.repository;

import com.techvg.shrms.domain.WorkingHours;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the WorkingHours entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkingHoursRepository extends JpaRepository<WorkingHours, Long>, JpaSpecificationExecutor<WorkingHours> {}
