import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../approval-level.test-samples';

import { ApprovalLevelFormService } from './approval-level-form.service';

describe('ApprovalLevel Form Service', () => {
  let service: ApprovalLevelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalLevelFormService);
  });

  describe('Service methods', () => {
    describe('createApprovalLevelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createApprovalLevelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            squence: expect.any(Object),
            approvalSettingId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IApprovalLevel should create a new form with FormGroup', () => {
        const formGroup = service.createApprovalLevelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            squence: expect.any(Object),
            approvalSettingId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getApprovalLevel', () => {
      it('should return NewApprovalLevel for default ApprovalLevel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createApprovalLevelFormGroup(sampleWithNewData);

        const approvalLevel = service.getApprovalLevel(formGroup) as any;

        expect(approvalLevel).toMatchObject(sampleWithNewData);
      });

      it('should return NewApprovalLevel for empty ApprovalLevel initial value', () => {
        const formGroup = service.createApprovalLevelFormGroup();

        const approvalLevel = service.getApprovalLevel(formGroup) as any;

        expect(approvalLevel).toMatchObject({});
      });

      it('should return IApprovalLevel', () => {
        const formGroup = service.createApprovalLevelFormGroup(sampleWithRequiredData);

        const approvalLevel = service.getApprovalLevel(formGroup) as any;

        expect(approvalLevel).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IApprovalLevel should not enable id FormControl', () => {
        const formGroup = service.createApprovalLevelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewApprovalLevel should disable id FormControl', () => {
        const formGroup = service.createApprovalLevelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
