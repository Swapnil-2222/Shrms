package com.techvg.shrms.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.techvg.shrms.domain.LeaveType} entity. This class is used
 * in {@link com.techvg.shrms.web.rest.LeaveTypeResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /leave-types?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LeaveTypeCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter leaveType;

    private StringFilter noOfDays;

    private LongFilter companyId;

    private StringFilter status;

    private InstantFilter lastModified;

    private StringFilter lastModifiedBy;

    private BooleanFilter hasCarryForward;

    private BooleanFilter hasEarned;

    private BooleanFilter hasCustomPolicy;

    private Boolean distinct;

    public LeaveTypeCriteria() {}

    public LeaveTypeCriteria(LeaveTypeCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.leaveType = other.leaveType == null ? null : other.leaveType.copy();
        this.noOfDays = other.noOfDays == null ? null : other.noOfDays.copy();
        this.companyId = other.companyId == null ? null : other.companyId.copy();
        this.status = other.status == null ? null : other.status.copy();
        this.lastModified = other.lastModified == null ? null : other.lastModified.copy();
        this.lastModifiedBy = other.lastModifiedBy == null ? null : other.lastModifiedBy.copy();
        this.hasCarryForward = other.hasCarryForward == null ? null : other.hasCarryForward.copy();
        this.hasEarned = other.hasEarned == null ? null : other.hasEarned.copy();
        this.hasCustomPolicy = other.hasCustomPolicy == null ? null : other.hasCustomPolicy.copy();
        this.distinct = other.distinct;
    }

    @Override
    public LeaveTypeCriteria copy() {
        return new LeaveTypeCriteria(this);
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

    public StringFilter getLeaveType() {
        return leaveType;
    }

    public StringFilter leaveType() {
        if (leaveType == null) {
            leaveType = new StringFilter();
        }
        return leaveType;
    }

    public void setLeaveType(StringFilter leaveType) {
        this.leaveType = leaveType;
    }

    public StringFilter getNoOfDays() {
        return noOfDays;
    }

    public StringFilter noOfDays() {
        if (noOfDays == null) {
            noOfDays = new StringFilter();
        }
        return noOfDays;
    }

    public void setNoOfDays(StringFilter noOfDays) {
        this.noOfDays = noOfDays;
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

    public BooleanFilter getHasCarryForward() {
        return hasCarryForward;
    }

    public BooleanFilter hasCarryForward() {
        if (hasCarryForward == null) {
            hasCarryForward = new BooleanFilter();
        }
        return hasCarryForward;
    }

    public void setHasCarryForward(BooleanFilter hasCarryForward) {
        this.hasCarryForward = hasCarryForward;
    }

    public BooleanFilter getHasEarned() {
        return hasEarned;
    }

    public BooleanFilter hasEarned() {
        if (hasEarned == null) {
            hasEarned = new BooleanFilter();
        }
        return hasEarned;
    }

    public void setHasEarned(BooleanFilter hasEarned) {
        this.hasEarned = hasEarned;
    }

    public BooleanFilter getHasCustomPolicy() {
        return hasCustomPolicy;
    }

    public BooleanFilter hasCustomPolicy() {
        if (hasCustomPolicy == null) {
            hasCustomPolicy = new BooleanFilter();
        }
        return hasCustomPolicy;
    }

    public void setHasCustomPolicy(BooleanFilter hasCustomPolicy) {
        this.hasCustomPolicy = hasCustomPolicy;
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
        final LeaveTypeCriteria that = (LeaveTypeCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(leaveType, that.leaveType) &&
            Objects.equals(noOfDays, that.noOfDays) &&
            Objects.equals(companyId, that.companyId) &&
            Objects.equals(status, that.status) &&
            Objects.equals(lastModified, that.lastModified) &&
            Objects.equals(lastModifiedBy, that.lastModifiedBy) &&
            Objects.equals(hasCarryForward, that.hasCarryForward) &&
            Objects.equals(hasEarned, that.hasEarned) &&
            Objects.equals(hasCustomPolicy, that.hasCustomPolicy) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            leaveType,
            noOfDays,
            companyId,
            status,
            lastModified,
            lastModifiedBy,
            hasCarryForward,
            hasEarned,
            hasCustomPolicy,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LeaveTypeCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (leaveType != null ? "leaveType=" + leaveType + ", " : "") +
            (noOfDays != null ? "noOfDays=" + noOfDays + ", " : "") +
            (companyId != null ? "companyId=" + companyId + ", " : "") +
            (status != null ? "status=" + status + ", " : "") +
            (lastModified != null ? "lastModified=" + lastModified + ", " : "") +
            (lastModifiedBy != null ? "lastModifiedBy=" + lastModifiedBy + ", " : "") +
            (hasCarryForward != null ? "hasCarryForward=" + hasCarryForward + ", " : "") +
            (hasEarned != null ? "hasEarned=" + hasEarned + ", " : "") +
            (hasCustomPolicy != null ? "hasCustomPolicy=" + hasCustomPolicy + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
