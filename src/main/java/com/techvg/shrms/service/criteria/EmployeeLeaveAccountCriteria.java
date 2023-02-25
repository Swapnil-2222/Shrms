package com.techvg.shrms.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.techvg.shrms.domain.EmployeeLeaveAccount} entity. This class is used
 * in {@link com.techvg.shrms.web.rest.EmployeeLeaveAccountResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /employee-leave-accounts?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EmployeeLeaveAccountCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter leaveTypeId;

    private LongFilter employeeId;

    private StringFilter carriedLeaves;

    private StringFilter creditedLeaves;

    private InstantFilter date;

    private StringFilter balance;

    private LongFilter companyId;

    private StringFilter status;

    private InstantFilter lastModified;

    private StringFilter lastModifiedBy;

    private Boolean distinct;

    public EmployeeLeaveAccountCriteria() {}

    public EmployeeLeaveAccountCriteria(EmployeeLeaveAccountCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.leaveTypeId = other.leaveTypeId == null ? null : other.leaveTypeId.copy();
        this.employeeId = other.employeeId == null ? null : other.employeeId.copy();
        this.carriedLeaves = other.carriedLeaves == null ? null : other.carriedLeaves.copy();
        this.creditedLeaves = other.creditedLeaves == null ? null : other.creditedLeaves.copy();
        this.date = other.date == null ? null : other.date.copy();
        this.balance = other.balance == null ? null : other.balance.copy();
        this.companyId = other.companyId == null ? null : other.companyId.copy();
        this.status = other.status == null ? null : other.status.copy();
        this.lastModified = other.lastModified == null ? null : other.lastModified.copy();
        this.lastModifiedBy = other.lastModifiedBy == null ? null : other.lastModifiedBy.copy();
        this.distinct = other.distinct;
    }

    @Override
    public EmployeeLeaveAccountCriteria copy() {
        return new EmployeeLeaveAccountCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LongFilter getLeaveTypeId() {
        return leaveTypeId;
    }

    public LongFilter leaveTypeId() {
        if (leaveTypeId == null) {
            leaveTypeId = new LongFilter();
        }
        return leaveTypeId;
    }

    public void setLeaveTypeId(LongFilter leaveTypeId) {
        this.leaveTypeId = leaveTypeId;
    }

    public LongFilter getEmployeeId() {
        return employeeId;
    }

    public LongFilter employeeId() {
        if (employeeId == null) {
            employeeId = new LongFilter();
        }
        return employeeId;
    }

    public void setEmployeeId(LongFilter employeeId) {
        this.employeeId = employeeId;
    }

    public StringFilter getCarriedLeaves() {
        return carriedLeaves;
    }

    public StringFilter carriedLeaves() {
        if (carriedLeaves == null) {
            carriedLeaves = new StringFilter();
        }
        return carriedLeaves;
    }

    public void setCarriedLeaves(StringFilter carriedLeaves) {
        this.carriedLeaves = carriedLeaves;
    }

    public StringFilter getCreditedLeaves() {
        return creditedLeaves;
    }

    public StringFilter creditedLeaves() {
        if (creditedLeaves == null) {
            creditedLeaves = new StringFilter();
        }
        return creditedLeaves;
    }

    public void setCreditedLeaves(StringFilter creditedLeaves) {
        this.creditedLeaves = creditedLeaves;
    }

    public InstantFilter getDate() {
        return date;
    }

    public InstantFilter date() {
        if (date == null) {
            date = new InstantFilter();
        }
        return date;
    }

    public void setDate(InstantFilter date) {
        this.date = date;
    }

    public StringFilter getBalance() {
        return balance;
    }

    public StringFilter balance() {
        if (balance == null) {
            balance = new StringFilter();
        }
        return balance;
    }

    public void setBalance(StringFilter balance) {
        this.balance = balance;
    }

    public LongFilter getCompanyId() {
        return companyId;
    }

    public LongFilter companyId() {
        if (companyId == null) {
            companyId = new LongFilter();
        }
        return companyId;
    }

    public void setCompanyId(LongFilter companyId) {
        this.companyId = companyId;
    }

    public StringFilter getStatus() {
        return status;
    }

    public StringFilter status() {
        if (status == null) {
            status = new StringFilter();
        }
        return status;
    }

    public void setStatus(StringFilter status) {
        this.status = status;
    }

    public InstantFilter getLastModified() {
        return lastModified;
    }

    public InstantFilter lastModified() {
        if (lastModified == null) {
            lastModified = new InstantFilter();
        }
        return lastModified;
    }

    public void setLastModified(InstantFilter lastModified) {
        this.lastModified = lastModified;
    }

    public StringFilter getLastModifiedBy() {
        return lastModifiedBy;
    }

    public StringFilter lastModifiedBy() {
        if (lastModifiedBy == null) {
            lastModifiedBy = new StringFilter();
        }
        return lastModifiedBy;
    }

    public void setLastModifiedBy(StringFilter lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EmployeeLeaveAccountCriteria that = (EmployeeLeaveAccountCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(leaveTypeId, that.leaveTypeId) &&
            Objects.equals(employeeId, that.employeeId) &&
            Objects.equals(carriedLeaves, that.carriedLeaves) &&
            Objects.equals(creditedLeaves, that.creditedLeaves) &&
            Objects.equals(date, that.date) &&
            Objects.equals(balance, that.balance) &&
            Objects.equals(companyId, that.companyId) &&
            Objects.equals(status, that.status) &&
            Objects.equals(lastModified, that.lastModified) &&
            Objects.equals(lastModifiedBy, that.lastModifiedBy) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            leaveTypeId,
            employeeId,
            carriedLeaves,
            creditedLeaves,
            date,
            balance,
            companyId,
            status,
            lastModified,
            lastModifiedBy,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeLeaveAccountCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (leaveTypeId != null ? "leaveTypeId=" + leaveTypeId + ", " : "") +
            (employeeId != null ? "employeeId=" + employeeId + ", " : "") +
            (carriedLeaves != null ? "carriedLeaves=" + carriedLeaves + ", " : "") +
            (creditedLeaves != null ? "creditedLeaves=" + creditedLeaves + ", " : "") +
            (date != null ? "date=" + date + ", " : "") +
            (balance != null ? "balance=" + balance + ", " : "") +
            (companyId != null ? "companyId=" + companyId + ", " : "") +
            (status != null ? "status=" + status + ", " : "") +
            (lastModified != null ? "lastModified=" + lastModified + ", " : "") +
            (lastModifiedBy != null ? "lastModifiedBy=" + lastModifiedBy + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
