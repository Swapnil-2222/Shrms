package com.techvg.shrms.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A LeaveApplication.
 */
@Entity
@Table(name = "leave_application")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LeaveApplication implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "leave_type")
    private String leaveType;

    @Column(name = "balance_leave")
    private Long balanceLeave;

    @Column(name = "no_of_days")
    private Long noOfDays;

    @Column(name = "reason")
    private String reason;

    @Column(name = "year")
    private Long year;

    @Column(name = "form_date")
    private Instant formDate;

    @Column(name = "to_date")
    private Instant toDate;

    @Column(name = "leave_status")
    private String leaveStatus;

    @Column(name = "status")
    private String status;

    @Column(name = "employe_id")
    private Long employeId;

    @Column(name = "company_id")
    private Long companyId;

    @Column(name = "last_modified")
    private Instant lastModified;

    @Column(name = "last_modified_by")
    private String lastModifiedBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LeaveApplication id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLeaveType() {
        return this.leaveType;
    }

    public LeaveApplication leaveType(String leaveType) {
        this.setLeaveType(leaveType);
        return this;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public Long getBalanceLeave() {
        return this.balanceLeave;
    }

    public LeaveApplication balanceLeave(Long balanceLeave) {
        this.setBalanceLeave(balanceLeave);
        return this;
    }

    public void setBalanceLeave(Long balanceLeave) {
        this.balanceLeave = balanceLeave;
    }

    public Long getNoOfDays() {
        return this.noOfDays;
    }

    public LeaveApplication noOfDays(Long noOfDays) {
        this.setNoOfDays(noOfDays);
        return this;
    }

    public void setNoOfDays(Long noOfDays) {
        this.noOfDays = noOfDays;
    }

    public String getReason() {
        return this.reason;
    }

    public LeaveApplication reason(String reason) {
        this.setReason(reason);
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Long getYear() {
        return this.year;
    }

    public LeaveApplication year(Long year) {
        this.setYear(year);
        return this;
    }

    public void setYear(Long year) {
        this.year = year;
    }

    public Instant getFormDate() {
        return this.formDate;
    }

    public LeaveApplication formDate(Instant formDate) {
        this.setFormDate(formDate);
        return this;
    }

    public void setFormDate(Instant formDate) {
        this.formDate = formDate;
    }

    public Instant getToDate() {
        return this.toDate;
    }

    public LeaveApplication toDate(Instant toDate) {
        this.setToDate(toDate);
        return this;
    }

    public void setToDate(Instant toDate) {
        this.toDate = toDate;
    }

    public String getLeaveStatus() {
        return this.leaveStatus;
    }

    public LeaveApplication leaveStatus(String leaveStatus) {
        this.setLeaveStatus(leaveStatus);
        return this;
    }

    public void setLeaveStatus(String leaveStatus) {
        this.leaveStatus = leaveStatus;
    }

    public String getStatus() {
        return this.status;
    }

    public LeaveApplication status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getEmployeId() {
        return this.employeId;
    }

    public LeaveApplication employeId(Long employeId) {
        this.setEmployeId(employeId);
        return this;
    }

    public void setEmployeId(Long employeId) {
        this.employeId = employeId;
    }

    public Long getCompanyId() {
        return this.companyId;
    }

    public LeaveApplication companyId(Long companyId) {
        this.setCompanyId(companyId);
        return this;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public Instant getLastModified() {
        return this.lastModified;
    }

    public LeaveApplication lastModified(Instant lastModified) {
        this.setLastModified(lastModified);
        return this;
    }

    public void setLastModified(Instant lastModified) {
        this.lastModified = lastModified;
    }

    public String getLastModifiedBy() {
        return this.lastModifiedBy;
    }

    public LeaveApplication lastModifiedBy(String lastModifiedBy) {
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
        if (!(o instanceof LeaveApplication)) {
            return false;
        }
        return id != null && id.equals(((LeaveApplication) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LeaveApplication{" +
            "id=" + getId() +
            ", leaveType='" + getLeaveType() + "'" +
            ", balanceLeave=" + getBalanceLeave() +
            ", noOfDays=" + getNoOfDays() +
            ", reason='" + getReason() + "'" +
            ", year=" + getYear() +
            ", formDate='" + getFormDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            ", leaveStatus='" + getLeaveStatus() + "'" +
            ", status='" + getStatus() + "'" +
            ", employeId=" + getEmployeId() +
            ", companyId=" + getCompanyId() +
            ", lastModified='" + getLastModified() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            "}";
    }
}
