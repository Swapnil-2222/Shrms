import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../approval-setting.test-samples';

import { ApprovalSettingFormService } from './approval-setting-form.service';

describe('ApprovalSetting Form Service', () => {
  let service: ApprovalSettingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalSettingFormService);
  });

  describe('Service methods', () => {
    describe('createApprovalSettingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createApprovalSettingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            type: expect.any(Object),
            approvalCategory: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IApprovalSetting should create a new form with FormGroup', () => {
        const formGroup = service.createApprovalSettingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            type: expect.any(Object),
            approvalCategory: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getApprovalSetting', () => {
      it('should return NewApprovalSetting for default ApprovalSetting initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createApprovalSettingFormGroup(sampleWithNewData);

        const approvalSetting = service.getApprovalSetting(formGroup) as any;

        expect(approvalSetting).toMatchObject(sampleWithNewData);
      });

      it('should return NewApprovalSetting for empty ApprovalSetting initial value', () => {
        const formGroup = service.createApprovalSettingFormGroup();

        const approvalSetting = service.getApprovalSetting(formGroup) as any;

        expect(approvalSetting).toMatchObject({});
      });

      it('should return IApprovalSetting', () => {
        const formGroup = service.createApprovalSettingFormGroup(sampleWithRequiredData);

        const approvalSetting = service.getApprovalSetting(formGroup) as any;

        expect(approvalSetting).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IApprovalSetting should not enable id FormControl', () => {
        const formGroup = service.createApprovalSettingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewApprovalSetting should disable id FormControl', () => {
        const formGroup = service.createApprovalSettingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
