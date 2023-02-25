import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tds.test-samples';

import { TdsFormService } from './tds-form.service';

describe('Tds Form Service', () => {
  let service: TdsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TdsFormService);
  });

  describe('Service methods', () => {
    describe('createTdsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTdsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            salaryFrom: expect.any(Object),
            salaryTo: expect.any(Object),
            percentage: expect.any(Object),
            salarySettingId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing ITds should create a new form with FormGroup', () => {
        const formGroup = service.createTdsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            salaryFrom: expect.any(Object),
            salaryTo: expect.any(Object),
            percentage: expect.any(Object),
            salarySettingId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getTds', () => {
      it('should return NewTds for default Tds initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTdsFormGroup(sampleWithNewData);

        const tds = service.getTds(formGroup) as any;

        expect(tds).toMatchObject(sampleWithNewData);
      });

      it('should return NewTds for empty Tds initial value', () => {
        const formGroup = service.createTdsFormGroup();

        const tds = service.getTds(formGroup) as any;

        expect(tds).toMatchObject({});
      });

      it('should return ITds', () => {
        const formGroup = service.createTdsFormGroup(sampleWithRequiredData);

        const tds = service.getTds(formGroup) as any;

        expect(tds).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITds should not enable id FormControl', () => {
        const formGroup = service.createTdsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTds should disable id FormControl', () => {
        const formGroup = service.createTdsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
