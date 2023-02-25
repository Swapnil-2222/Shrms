package com.techvg.shrms.repository;

import com.techvg.shrms.domain.EmployeeLeaveAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EmployeeLeaveAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeLeaveAccountRepository
    extends JpaRepository<EmployeeLeaveAccount, Long>, JpaSpecificationExecutor<EmployeeLeaveAccount> {}
