package com.techvg.shrms.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.techvg.shrms.domain.EmployeeLeaveAccount} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EmployeeLeaveAccountDTO implements Serializable {

    private Long id;

    private Long leaveTypeId;

    private Long employeeId;

    private String carriedLeaves;

    private String creditedLeaves;

    private Instant date;

    private String balance;

    private Long companyId;

    private String status;

    private Instant lastModified;

    private String lastModifiedBy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLeaveTypeId() {
        return leaveTypeId;
    }

    public void setLeaveTypeId(Long leaveTypeId) {
        this.leaveTypeId = leaveTypeId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getCarriedLeaves() {
        return carriedLeaves;
    }

    public void setCarriedLeaves(String carriedLeaves) {
        this.carriedLeaves = carriedLeaves;
    }

    public String getCreditedLeaves() {
        return creditedLeaves;
    }

    public void setCreditedLeaves(String creditedLeaves) {
        this.creditedLeaves = creditedLeaves;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getLastModified() {
        return lastModified;
    }

    public void setLastModified(Instant lastModified) {
        this.lastModified = lastModified;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeLeaveAccountDTO)) {
            return false;
        }

        EmployeeLeaveAccountDTO employeeLeaveAccountDTO = (EmployeeLeaveAccountDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, employeeLeaveAccountDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeLeaveAccountDTO{" +
            "id=" + getId() +
            ", leaveTypeId=" + getLeaveTypeId() +
            ", employeeId=" + getEmployeeId() +
            ", carriedLeaves='" + getCarriedLeaves() + "'" +
            ", creditedLeaves='" + getCreditedLeaves() + "'" +
            ", date='" + getDate() + "'" +
            ", balance='" + getBalance() + "'" +
            ", companyId=" + getCompanyId() +
            ", status='" + getStatus() + "'" +
            ", lastModified='" + getLastModified() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            "}";
    }
}
