import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../employment-type.test-samples';

import { EmploymentTypeFormService } from './employment-type-form.service';

describe('EmploymentType Form Service', () => {
  let service: EmploymentTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentTypeFormService);
  });

  describe('Service methods', () => {
    describe('createEmploymentTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEmploymentTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            subtype: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IEmploymentType should create a new form with FormGroup', () => {
        const formGroup = service.createEmploymentTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            subtype: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getEmploymentType', () => {
      it('should return NewEmploymentType for default EmploymentType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEmploymentTypeFormGroup(sampleWithNewData);

        const employmentType = service.getEmploymentType(formGroup) as any;

        expect(employmentType).toMatchObject(sampleWithNewData);
      });

      it('should return NewEmploymentType for empty EmploymentType initial value', () => {
        const formGroup = service.createEmploymentTypeFormGroup();

        const employmentType = service.getEmploymentType(formGroup) as any;

        expect(employmentType).toMatchObject({});
      });

      it('should return IEmploymentType', () => {
        const formGroup = service.createEmploymentTypeFormGroup(sampleWithRequiredData);

        const employmentType = service.getEmploymentType(formGroup) as any;

        expect(employmentType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEmploymentType should not enable id FormControl', () => {
        const formGroup = service.createEmploymentTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEmploymentType should disable id FormControl', () => {
        const formGroup = service.createEmploymentTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
