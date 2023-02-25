package com.techvg.shrms.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.techvg.shrms.domain.CustomLeavePolicy} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CustomLeavePolicyDTO implements Serializable {

    private Long id;

    private Long leavePolicyId;

    private Long employeeId;

    private Long days;

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

    public Long getLeavePolicyId() {
        return leavePolicyId;
    }

    public void setLeavePolicyId(Long leavePolicyId) {
        this.leavePolicyId = leavePolicyId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getDays() {
        return days;
    }

    public void setDays(Long days) {
        this.days = days;
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
        if (!(o instanceof CustomLeavePolicyDTO)) {
            return false;
        }

        CustomLeavePolicyDTO customLeavePolicyDTO = (CustomLeavePolicyDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, customLeavePolicyDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CustomLeavePolicyDTO{" +
            "id=" + getId() +
            ", leavePolicyId=" + getLeavePolicyId() +
            ", employeeId=" + getEmployeeId() +
            ", days=" + getDays() +
            ", companyId=" + getCompanyId() +
            ", status='" + getStatus() + "'" +
            ", lastModified='" + getLastModified() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            "}";
    }
}
