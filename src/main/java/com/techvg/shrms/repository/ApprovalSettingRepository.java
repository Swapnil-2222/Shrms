package com.techvg.shrms.repository;

import com.techvg.shrms.domain.ApprovalSetting;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ApprovalSetting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApprovalSettingRepository extends JpaRepository<ApprovalSetting, Long>, JpaSpecificationExecutor<ApprovalSetting> {}
