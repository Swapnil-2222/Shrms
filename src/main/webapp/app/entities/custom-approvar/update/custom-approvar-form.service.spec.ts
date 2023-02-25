import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../custom-approvar.test-samples';

import { CustomApprovarFormService } from './custom-approvar-form.service';

describe('CustomApprovar Form Service', () => {
  let service: CustomApprovarFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomApprovarFormService);
  });

  describe('Service methods', () => {
    describe('createCustomApprovarFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCustomApprovarFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            employeId: expect.any(Object),
            approvalSettingId: expect.any(Object),
            squence: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing ICustomApprovar should create a new form with FormGroup', () => {
        const formGroup = service.createCustomApprovarFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            employeId: expect.any(Object),
            approvalSettingId: expect.any(Object),
            squence: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getCustomApprovar', () => {
      it('should return NewCustomApprovar for default CustomApprovar initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCustomApprovarFormGroup(sampleWithNewData);

        const customApprovar = service.getCustomApprovar(formGroup) as any;

        expect(customApprovar).toMatchObject(sampleWithNewData);
      });

      it('should return NewCustomApprovar for empty CustomApprovar initial value', () => {
        const formGroup = service.createCustomApprovarFormGroup();

        const customApprovar = service.getCustomApprovar(formGroup) as any;

        expect(customApprovar).toMatchObject({});
      });

      it('should return ICustomApprovar', () => {
        const formGroup = service.createCustomApprovarFormGroup(sampleWithRequiredData);

        const customApprovar = service.getCustomApprovar(formGroup) as any;

        expect(customApprovar).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICustomApprovar should not enable id FormControl', () => {
        const formGroup = service.createCustomApprovarFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCustomApprovar should disable id FormControl', () => {
        const formGroup = service.createCustomApprovarFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
