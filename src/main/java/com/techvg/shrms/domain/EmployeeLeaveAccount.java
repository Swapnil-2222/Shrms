package com.techvg.shrms.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EmployeeLeaveAccount.
 */
@Entity
@Table(name = "employee_leave_account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EmployeeLeaveAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "leave_type_id")
    private Long leaveTypeId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "carried_leaves")
    private String carriedLeaves;

    @Column(name = "credited_leaves")
    private String creditedLeaves;

    @Column(name = "date")
    private Instant date;

    @Column(name = "balance")
    private String balance;

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

    public EmployeeLeaveAccount id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLeaveTypeId() {
        return this.leaveTypeId;
    }

    public EmployeeLeaveAccount leaveTypeId(Long leaveTypeId) {
        this.setLeaveTypeId(leaveTypeId);
        return this;
    }

    public void setLeaveTypeId(Long leaveTypeId) {
        this.leaveTypeId = leaveTypeId;
    }

    public Long getEmployeeId() {
        return this.employeeId;
    }

    public EmployeeLeaveAccount employeeId(Long employeeId) {
        this.setEmployeeId(employeeId);
        return this;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getCarriedLeaves() {
        return this.carriedLeaves;
    }

    public EmployeeLeaveAccount carriedLeaves(String carriedLeaves) {
        this.setCarriedLeaves(carriedLeaves);
        return this;
    }

    public void setCarriedLeaves(String carriedLeaves) {
        this.carriedLeaves = carriedLeaves;
    }

    public String getCreditedLeaves() {
        return this.creditedLeaves;
    }

    public EmployeeLeaveAccount creditedLeaves(String creditedLeaves) {
        this.setCreditedLeaves(creditedLeaves);
        return this;
    }

    public void setCreditedLeaves(String creditedLeaves) {
        this.creditedLeaves = creditedLeaves;
    }

    public Instant getDate() {
        return this.date;
    }

    public EmployeeLeaveAccount date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getBalance() {
        return this.balance;
    }

    public EmployeeLeaveAccount balance(String balance) {
        this.setBalance(balance);
        return this;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public Long getCompanyId() {
        return this.companyId;
    }

    public EmployeeLeaveAccount companyId(Long companyId) {
        this.setCompanyId(companyId);
        return this;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getStatus() {
        return this.status;
    }

    public EmployeeLeaveAccount status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getLastModified() {
        return this.lastModified;
    }

    public EmployeeLeaveAccount lastModified(Instant lastModified) {
        this.setLastModified(lastModified);
        return this;
    }

    public void setLastModified(Instant lastModified) {
        this.lastModified = lastModified;
    }

    public String getLastModifiedBy() {
        return this.lastModifiedBy;
    }

    public EmployeeLeaveAccount lastModifiedBy(String lastModifiedBy) {
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
        if (!(o instanceof EmployeeLeaveAccount)) {
            return false;
        }
        return id != null && id.equals(((EmployeeLeaveAccount) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeLeaveAccount{" +
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
