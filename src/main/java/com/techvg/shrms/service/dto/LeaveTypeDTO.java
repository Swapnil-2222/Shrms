package com.techvg.shrms.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.techvg.shrms.domain.LeaveType} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LeaveTypeDTO implements Serializable {

    private Long id;

    private String leaveType;

    private String noOfDays;

    private Long companyId;

    private String status;

    private Instant lastModified;

    private String lastModifiedBy;

    private Boolean hasCarryForward;

    private Boolean hasEarned;

    private Boolean hasCustomPolicy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public String getNoOfDays() {
        return noOfDays;
    }

    public void setNoOfDays(String noOfDays) {
        this.noOfDays = noOfDays;
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

    public Boolean getHasCarryForward() {
        return hasCarryForward;
    }

    public void setHasCarryForward(Boolean hasCarryForward) {
        this.hasCarryForward = hasCarryForward;
    }

    public Boolean getHasEarned() {
        return hasEarned;
    }

    public void setHasEarned(Boolean hasEarned) {
        this.hasEarned = hasEarned;
    }

    public Boolean getHasCustomPolicy() {
        return hasCustomPolicy;
    }

    public void setHasCustomPolicy(Boolean hasCustomPolicy) {
        this.hasCustomPolicy = hasCustomPolicy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LeaveTypeDTO)) {
            return false;
        }

        LeaveTypeDTO leaveTypeDTO = (LeaveTypeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, leaveTypeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LeaveTypeDTO{" +
            "id=" + getId() +
            ", leaveType='" + getLeaveType() + "'" +
            ", noOfDays='" + getNoOfDays() + "'" +
            ", companyId=" + getCompanyId() +
            ", status='" + getStatus() + "'" +
            ", lastModified='" + getLastModified() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", hasCarryForward='" + getHasCarryForward() + "'" +
            ", hasEarned='" + getHasEarned() + "'" +
            ", hasCustomPolicy='" + getHasCustomPolicy() + "'" +
            "}";
    }
}
