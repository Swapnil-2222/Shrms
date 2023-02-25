import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../custom-leave-policy.test-samples';

import { CustomLeavePolicyFormService } from './custom-leave-policy-form.service';

describe('CustomLeavePolicy Form Service', () => {
  let service: CustomLeavePolicyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomLeavePolicyFormService);
  });

  describe('Service methods', () => {
    describe('createCustomLeavePolicyFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCustomLeavePolicyFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            leavePolicyId: expect.any(Object),
            employeeId: expect.any(Object),
            days: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing ICustomLeavePolicy should create a new form with FormGroup', () => {
        const formGroup = service.createCustomLeavePolicyFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            leavePolicyId: expect.any(Object),
            employeeId: expect.any(Object),
            days: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getCustomLeavePolicy', () => {
      it('should return NewCustomLeavePolicy for default CustomLeavePolicy initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCustomLeavePolicyFormGroup(sampleWithNewData);

        const customLeavePolicy = service.getCustomLeavePolicy(formGroup) as any;

        expect(customLeavePolicy).toMatchObject(sampleWithNewData);
      });

      it('should return NewCustomLeavePolicy for empty CustomLeavePolicy initial value', () => {
        const formGroup = service.createCustomLeavePolicyFormGroup();

        const customLeavePolicy = service.getCustomLeavePolicy(formGroup) as any;

        expect(customLeavePolicy).toMatchObject({});
      });

      it('should return ICustomLeavePolicy', () => {
        const formGroup = service.createCustomLeavePolicyFormGroup(sampleWithRequiredData);

        const customLeavePolicy = service.getCustomLeavePolicy(formGroup) as any;

        expect(customLeavePolicy).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICustomLeavePolicy should not enable id FormControl', () => {
        const formGroup = service.createCustomLeavePolicyFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCustomLeavePolicy should disable id FormControl', () => {
        const formGroup = service.createCustomLeavePolicyFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
