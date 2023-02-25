import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../pf-details.test-samples';

import { PfDetailsFormService } from './pf-details-form.service';

describe('PfDetails Form Service', () => {
  let service: PfDetailsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfDetailsFormService);
  });

  describe('Service methods', () => {
    describe('createPfDetailsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPfDetailsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isPfContribution: expect.any(Object),
            pfNumber: expect.any(Object),
            pfRate: expect.any(Object),
            additionalPfRate: expect.any(Object),
            totalPfRate: expect.any(Object),
            employeId: expect.any(Object),
            reEnumerationId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IPfDetails should create a new form with FormGroup', () => {
        const formGroup = service.createPfDetailsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isPfContribution: expect.any(Object),
            pfNumber: expect.any(Object),
            pfRate: expect.any(Object),
            additionalPfRate: expect.any(Object),
            totalPfRate: expect.any(Object),
            employeId: expect.any(Object),
            reEnumerationId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getPfDetails', () => {
      it('should return NewPfDetails for default PfDetails initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPfDetailsFormGroup(sampleWithNewData);

        const pfDetails = service.getPfDetails(formGroup) as any;

        expect(pfDetails).toMatchObject(sampleWithNewData);
      });

      it('should return NewPfDetails for empty PfDetails initial value', () => {
        const formGroup = service.createPfDetailsFormGroup();

        const pfDetails = service.getPfDetails(formGroup) as any;

        expect(pfDetails).toMatchObject({});
      });

      it('should return IPfDetails', () => {
        const formGroup = service.createPfDetailsFormGroup(sampleWithRequiredData);

        const pfDetails = service.getPfDetails(formGroup) as any;

        expect(pfDetails).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPfDetails should not enable id FormControl', () => {
        const formGroup = service.createPfDetailsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPfDetails should disable id FormControl', () => {
        const formGroup = service.createPfDetailsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
