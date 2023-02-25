import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../employee-leave-account.test-samples';

import { EmployeeLeaveAccountFormService } from './employee-leave-account-form.service';

describe('EmployeeLeaveAccount Form Service', () => {
  let service: EmployeeLeaveAccountFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeLeaveAccountFormService);
  });

  describe('Service methods', () => {
    describe('createEmployeeLeaveAccountFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEmployeeLeaveAccountFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            leaveTypeId: expect.any(Object),
            employeeId: expect.any(Object),
            carriedLeaves: expect.any(Object),
            creditedLeaves: expect.any(Object),
            date: expect.any(Object),
            balance: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IEmployeeLeaveAccount should create a new form with FormGroup', () => {
        const formGroup = service.createEmployeeLeaveAccountFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            leaveTypeId: expect.any(Object),
            employeeId: expect.any(Object),
            carriedLeaves: expect.any(Object),
            creditedLeaves: expect.any(Object),
            date: expect.any(Object),
            balance: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getEmployeeLeaveAccount', () => {
      it('should return NewEmployeeLeaveAccount for default EmployeeLeaveAccount initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEmployeeLeaveAccountFormGroup(sampleWithNewData);

        const employeeLeaveAccount = service.getEmployeeLeaveAccount(formGroup) as any;

        expect(employeeLeaveAccount).toMatchObject(sampleWithNewData);
      });

      it('should return NewEmployeeLeaveAccount for empty EmployeeLeaveAccount initial value', () => {
        const formGroup = service.createEmployeeLeaveAccountFormGroup();

        const employeeLeaveAccount = service.getEmployeeLeaveAccount(formGroup) as any;

        expect(employeeLeaveAccount).toMatchObject({});
      });

      it('should return IEmployeeLeaveAccount', () => {
        const formGroup = service.createEmployeeLeaveAccountFormGroup(sampleWithRequiredData);

        const employeeLeaveAccount = service.getEmployeeLeaveAccount(formGroup) as any;

        expect(employeeLeaveAccount).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEmployeeLeaveAccount should not enable id FormControl', () => {
        const formGroup = service.createEmployeeLeaveAccountFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEmployeeLeaveAccount should disable id FormControl', () => {
        const formGroup = service.createEmployeeLeaveAccountFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
