package com.techvg.shrms.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.techvg.shrms.domain.PfDetails} entity. This class is used
 * in {@link com.techvg.shrms.web.rest.PfDetailsResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /pf-details?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PfDetailsCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private BooleanFilter isPfContribution;

    private StringFilter pfNumber;

    private DoubleFilter pfRate;

    private StringFilter additionalPfRate;

    private DoubleFilter totalPfRate;

    private LongFilter employeId;

    private LongFilter reEnumerationId;

    private LongFilter companyId;

    private StringFilter status;

    private InstantFilter lastModified;

    private StringFilter lastModifiedBy;

    private Boolean distinct;

    public PfDetailsCriteria() {}

    public PfDetailsCriteria(PfDetailsCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.isPfContribution = other.isPfContribution == null ? null : other.isPfContribution.copy();
        this.pfNumber = other.pfNumber == null ? null : other.pfNumber.copy();
        this.pfRate = other.pfRate == null ? null : other.pfRate.copy();
        this.additionalPfRate = other.additionalPfRate == null ? null : other.additionalPfRate.copy();
        this.totalPfRate = other.totalPfRate == null ? null : other.totalPfRate.copy();
        this.employeId = other.employeId == null ? null : other.employeId.copy();
        this.reEnumerationId = other.reEnumerationId == null ? null : other.reEnumerationId.copy();
        this.companyId = other.companyId == null ? null : other.companyId.copy();
        this.status = other.status == null ? null : other.status.copy();
        this.lastModified = other.lastModified == null ? null : other.lastModified.copy();
        this.lastModifiedBy = other.lastModifiedBy == null ? null : other.lastModifiedBy.copy();
        this.distinct = other.distinct;
    }

    @Override
    public PfDetailsCriteria copy() {
        return new PfDetailsCriteria(this);
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

    public BooleanFilter getIsPfContribution() {
        return isPfContribution;
    }

    public BooleanFilter isPfContribution() {
        if (isPfContribution == null) {
            isPfContribution = new BooleanFilter();
        }
        return isPfContribution;
    }

    public void setIsPfContribution(BooleanFilter isPfContribution) {
        this.isPfContribution = isPfContribution;
    }

    public StringFilter getPfNumber() {
        return pfNumber;
    }

    public StringFilter pfNumber() {
        if (pfNumber == null) {
            pfNumber = new StringFilter();
        }
        return pfNumber;
    }

    public void setPfNumber(StringFilter pfNumber) {
        this.pfNumber = pfNumber;
    }

    public DoubleFilter getPfRate() {
        return pfRate;
    }

    public DoubleFilter pfRate() {
        if (pfRate == null) {
            pfRate = new DoubleFilter();
        }
        return pfRate;
    }

    public void setPfRate(DoubleFilter pfRate) {
        this.pfRate = pfRate;
    }

    public StringFilter getAdditionalPfRate() {
        return additionalPfRate;
    }

    public StringFilter additionalPfRate() {
        if (additionalPfRate == null) {
            additionalPfRate = new StringFilter();
        }
        return additionalPfRate;
    }

    public void setAdditionalPfRate(StringFilter additionalPfRate) {
        this.additionalPfRate = additionalPfRate;
    }

    public DoubleFilter getTotalPfRate() {
        return totalPfRate;
    }

    public DoubleFilter totalPfRate() {
        if (totalPfRate == null) {
            totalPfRate = new DoubleFilter();
        }
        return totalPfRate;
    }

    public void setTotalPfRate(DoubleFilter totalPfRate) {
        this.totalPfRate = totalPfRate;
    }

    public LongFilter getEmployeId() {
        return employeId;
    }

    public LongFilter employeId() {
        if (employeId == null) {
            employeId = new LongFilter();
        }
        return employeId;
    }

    public void setEmployeId(LongFilter employeId) {
        this.employeId = employeId;
    }

    public LongFilter getReEnumerationId() {
        return reEnumerationId;
    }

    public LongFilter reEnumerationId() {
        if (reEnumerationId == null) {
            reEnumerationId = new LongFilter();
        }
        return reEnumerationId;
    }

    public void setReEnumerationId(LongFilter reEnumerationId) {
        this.reEnumerationId = reEnumerationId;
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
        final PfDetailsCriteria that = (PfDetailsCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(isPfContribution, that.isPfContribution) &&
            Objects.equals(pfNumber, that.pfNumber) &&
            Objects.equals(pfRate, that.pfRate) &&
            Objects.equals(additionalPfRate, that.additionalPfRate) &&
            Objects.equals(totalPfRate, that.totalPfRate) &&
            Objects.equals(employeId, that.employeId) &&
            Objects.equals(reEnumerationId, that.reEnumerationId) &&
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
            isPfContribution,
            pfNumber,
            pfRate,
            additionalPfRate,
            totalPfRate,
            employeId,
            reEnumerationId,
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
        return "PfDetailsCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (isPfContribution != null ? "isPfContribution=" + isPfContribution + ", " : "") +
            (pfNumber != null ? "pfNumber=" + pfNumber + ", " : "") +
            (pfRate != null ? "pfRate=" + pfRate + ", " : "") +
            (additionalPfRate != null ? "additionalPfRate=" + additionalPfRate + ", " : "") +
            (totalPfRate != null ? "totalPfRate=" + totalPfRate + ", " : "") +
            (employeId != null ? "employeId=" + employeId + ", " : "") +
            (reEnumerationId != null ? "reEnumerationId=" + reEnumerationId + ", " : "") +
            (companyId != null ? "companyId=" + companyId + ", " : "") +
            (status != null ? "status=" + status + ", " : "") +
            (lastModified != null ? "lastModified=" + lastModified + ", " : "") +
            (lastModifiedBy != null ? "lastModifiedBy=" + lastModifiedBy + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
