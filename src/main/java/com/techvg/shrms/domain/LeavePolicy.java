package com.techvg.shrms.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A LeavePolicy.
 */
@Entity
@Table(name = "leave_policy")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LeavePolicy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "leave_type")
    private String leaveType;

    @Column(name = "is_carry_forword")
    private Boolean isCarryForword;

    @Column(name = "employee_type")
    private String employeeType;

    @Column(name = "gender_leave")
    private String genderLeave;

    @Column(name = "total_leave")
    private String totalLeave;

    @Column(name = "max_leave")
    private String maxLeave;

    @Column(name = "haspro_rata_leave")
    private Boolean hasproRataLeave;

    @Column(name = "description")
    private String description;

    @Column(name = "company_id")
    private Long companyId;

    @Column(name = "status")
    private String status;

    @Column(name = "last_modified")
    private Instant lastModified;

    @Column(name = "last_modified_by")
    private String lastModifiedBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LeavePolicy id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLeaveType() {
        return this.leaveType;
    }

    public LeavePolicy leaveType(String leaveType) {
        this.setLeaveType(leaveType);
        return this;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public Boolean getIsCarryForword() {
        return this.isCarryForword;
    }

    public LeavePolicy isCarryForword(Boolean isCarryForword) {
        this.setIsCarryForword(isCarryForword);
        return this;
    }

    public void setIsCarryForword(Boolean isCarryForword) {
        this.isCarryForword = isCarryForword;
    }

    public String getEmployeeType() {
        return this.employeeType;
    }

    public LeavePolicy employeeType(String employeeType) {
        this.setEmployeeType(employeeType);
        return this;
    }

    public void setEmployeeType(String employeeType) {
        this.employeeType = employeeType;
    }

    public String getGenderLeave() {
        return this.genderLeave;
    }

    public LeavePolicy genderLeave(String genderLeave) {
        this.setGenderLeave(genderLeave);
        return this;
    }

    public void setGenderLeave(String genderLeave) {
        this.genderLeave = genderLeave;
    }

    public String getTotalLeave() {
        return this.totalLeave;
    }

    public LeavePolicy totalLeave(String totalLeave) {
        this.setTotalLeave(totalLeave);
        return this;
    }

    public void setTotalLeave(String totalLeave) {
        this.totalLeave = totalLeave;
    }

    public String getMaxLeave() {
        return this.maxLeave;
    }

    public LeavePolicy maxLeave(String maxLeave) {
        this.setMaxLeave(maxLeave);
        return this;
    }

    public void setMaxLeave(String maxLeave) {
        this.maxLeave = maxLeave;
    }

    public Boolean getHasproRataLeave() {
        return this.hasproRataLeave;
    }

    public LeavePolicy hasproRataLeave(Boolean hasproRataLeave) {
        this.setHasproRataLeave(hasproRataLeave);
        return this;
    }

    public void setHasproRataLeave(Boolean hasproRataLeave) {
        this.hasproRataLeave = hasproRataLeave;
    }

    public String getDescription() {
        return this.description;
    }

    public LeavePolicy description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCompanyId() {
        return this.companyId;
    }

    public LeavePolicy companyId(Long companyId) {
        this.setCompanyId(companyId);
        return this;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getStatus() {
        return this.status;
    }

    public LeavePolicy status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getLastModified() {
        return this.lastModified;
    }

    public LeavePolicy lastModified(Instant lastModified) {
        this.setLastModified(lastModified);
        return this;
    }

    public void setLastModified(Instant lastModified) {
        this.lastModified = lastModified;
    }

    public String getLastModifiedBy() {
        return this.lastModifiedBy;
    }

    public LeavePolicy lastModifiedBy(String lastModifiedBy) {
        this.setLastModifiedBy(lastModifiedBy);
        return this;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LeavePolicy)) {
            return false;
        }
        return id != null && id.equals(((LeavePolicy) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LeavePolicy{" +
            "id=" + getId() +
            ", leaveType='" + getLeaveType() + "'" +
            ", isCarryForword='" + getIsCarryForword() + "'" +
            ", employeeType='" + getEmployeeType() + "'" +
            ", genderLeave='" + getGenderLeave() + "'" +
            ", totalLeave='" + getTotalLeave() + "'" +
            ", maxLeave='" + getMaxLeave() + "'" +
            ", hasproRataLeave='" + getHasproRataLeave() + "'" +
            ", description='" + getDescription() + "'" +
            ", companyId=" + getCompanyId() +
            ", status='" + getStatus() + "'" +
            ", lastModified='" + getLastModified() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            "}";
    }
}
